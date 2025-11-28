import { useState } from 'react';
import { useVctStore } from '../../store/vctStore';
import { VCTRendering } from '../../types/vct';

export default function DisplayForm() {
  const currentVct = useVctStore((state) => state.currentVct);
  const updateDisplay = useVctStore((state) => state.updateDisplay);
  const [activeTab, setActiveTab] = useState(0);

  const display = currentVct.display[activeTab];

  const updateRendering = (rendering: Partial<VCTRendering>) => {
    updateDisplay(activeTab, {
      rendering: { ...display.rendering, ...rendering },
    });
  };

  const generateHash = async (url: string, type: 'logo' | 'svg') => {
    try {
      const response = await fetch(
        `http://localhost:3001/hash?url=${encodeURIComponent(url)}`
      );
      const data = await response.json();
      if (data.hash) {
        if (type === 'logo') {
          updateRendering({
            simple: {
              ...display.rendering?.simple!,
              logo: {
                uri: url,
                'uri#integrity': data.hash,
              },
            },
          });
        } else {
          updateRendering({
            svg_template: {
              ...display.rendering?.svg_template,
              uri: url,
              'uri#integrity': data.hash,
            },
          });
        }
      }
    } catch (error) {
      console.error('Failed to generate hash:', error);
      alert('Failed to generate hash. Make sure the proxy server is running.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Display Configuration
      </h3>

      {/* Language Tabs */}
      <div className="flex border-b border-gray-200">
        {currentVct.display.map((d, index) => (
          <button
            key={d.lang}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {d.lang === 'en-CA' ? 'English (CA)' : 'Français (CA)'}
          </button>
        ))}
      </div>

      {display && (
        <div className="space-y-4 pt-4">
          {/* Localized Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name ({display.lang})
            </label>
            <input
              type="text"
              value={display.name}
              onChange={(e) => updateDisplay(activeTab, { name: e.target.value })}
              placeholder={display.lang === 'en-CA' ? 'Credential Name' : 'Nom du justificatif'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Localized Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Description ({display.lang})
            </label>
            <textarea
              value={display.description || ''}
              onChange={(e) => updateDisplay(activeTab, { description: e.target.value })}
              placeholder={display.lang === 'en-CA' ? 'Description...' : 'Description...'}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Simple Rendering */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-gray-800">Simple Card Rendering</h4>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={display.rendering?.simple?.background_color || '#1E3A5F'}
                  onChange={(e) =>
                    updateRendering({
                      simple: {
                        ...display.rendering?.simple!,
                        background_color: e.target.value,
                      },
                    })
                  }
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={display.rendering?.simple?.background_color || '#1E3A5F'}
                  onChange={(e) =>
                    updateRendering({
                      simple: {
                        ...display.rendering?.simple!,
                        background_color: e.target.value,
                      },
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                />
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={display.rendering?.simple?.text_color || '#FFFFFF'}
                  onChange={(e) =>
                    updateRendering({
                      simple: {
                        ...display.rendering?.simple!,
                        text_color: e.target.value,
                      },
                    })
                  }
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={display.rendering?.simple?.text_color || '#FFFFFF'}
                  onChange={(e) =>
                    updateRendering({
                      simple: {
                        ...display.rendering?.simple!,
                        text_color: e.target.value,
                      },
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                />
              </div>
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={display.rendering?.simple?.logo?.uri || ''}
                  onChange={(e) =>
                    updateRendering({
                      simple: {
                        ...display.rendering?.simple!,
                        logo: {
                          ...display.rendering?.simple?.logo,
                          uri: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="https://example.com/logo.png"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const url = display.rendering?.simple?.logo?.uri;
                    if (url) generateHash(url, 'logo');
                  }}
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  Hash
                </button>
              </div>
              {display.rendering?.simple?.logo?.['uri#integrity'] && (
                <p className="mt-1 text-xs text-green-600 font-mono truncate">
                  {display.rendering.simple.logo['uri#integrity']}
                </p>
              )}
            </div>
          </div>

          {/* SVG Template Rendering */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-gray-800">SVG Template Rendering</h4>
            <p className="text-xs text-gray-500">
              Recommended: SVG format, 400x250px, max 500KB
            </p>

            {/* SVG Template URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SVG Template URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={display.rendering?.svg_template?.uri || ''}
                  onChange={(e) =>
                    updateRendering({
                      svg_template: {
                        ...display.rendering?.svg_template,
                        uri: e.target.value,
                      },
                    })
                  }
                  placeholder="https://example.com/template.svg"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const url = display.rendering?.svg_template?.uri;
                    if (url) generateHash(url, 'svg');
                  }}
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  Hash
                </button>
              </div>
              {display.rendering?.svg_template?.['uri#integrity'] && (
                <p className="mt-1 text-xs text-green-600 font-mono truncate">
                  {display.rendering.svg_template['uri#integrity']}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
