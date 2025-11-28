import { useVctStore } from '../../store/vctStore';

interface CredentialPreviewProps {
  lang: string;
  mode: 'simple' | 'svg';
}

export default function CredentialPreview({ lang, mode }: CredentialPreviewProps) {
  const currentVct = useVctStore((state) => state.currentVct);
  const sampleData = useVctStore((state) => state.sampleData);

  const display = currentVct.display.find((d) => d.lang === lang);

  if (!display) {
    return (
      <div className="p-8 text-center text-gray-500">
        No display configuration for {lang}
      </div>
    );
  }

  const renderSimpleCard = () => {
    const simple = display.rendering?.simple;
    if (!simple) {
      return (
        <div className="p-8 text-center text-gray-500">
          Simple rendering not configured
        </div>
      );
    }

    return (
      <div
        className="rounded-xl shadow-lg overflow-hidden"
        style={{
          backgroundColor: simple.background_color,
          color: simple.text_color,
          width: '320px',
          minHeight: '200px',
        }}
      >
        {/* Card Header */}
        <div className="p-4 flex items-start justify-between">
          {simple.logo?.uri && (
            <img
              src={simple.logo.uri}
              alt="Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="text-right">
            <p className="text-xs opacity-75">Verifiable Credential</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="px-4 pb-4">
          <h3 className="text-lg font-bold mb-1">
            {display.name || currentVct.name || 'Credential Name'}
          </h3>
          {display.description && (
            <p className="text-sm opacity-80 mb-3">{display.description}</p>
          )}

          {/* Sample Data Fields */}
          {currentVct.claims.length > 0 && (
            <div className="space-y-2 mt-4 pt-4 border-t border-white/20">
              {currentVct.claims.slice(0, 4).map((claim, index) => {
                const claimDisplay = claim.display.find((d) => d.lang === lang);
                const pathString = claim.path.filter(Boolean).join('.');
                const value = sampleData[pathString];

                if (!claimDisplay?.label) return null;

                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="opacity-75">{claimDisplay.label}:</span>
                    <span className="font-medium">{value || '—'}</span>
                  </div>
                );
              })}
              {currentVct.claims.length > 4 && (
                <p className="text-xs opacity-60 text-center">
                  +{currentVct.claims.length - 4} more fields
                </p>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div
          className="px-4 py-2 text-xs opacity-60"
          style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
        >
          {currentVct.vct || 'Credential Type URI'}
        </div>
      </div>
    );
  };

  const renderSvgTemplate = () => {
    const svgTemplate = display.rendering?.svg_template;
    if (!svgTemplate?.uri) {
      return (
        <div className="p-8 text-center text-gray-500">
          <p>SVG template not configured</p>
          <p className="text-sm mt-2">
            Add an SVG template URL in the Display tab
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <img
          src={svgTemplate.uri}
          alt="Credential SVG Template"
          className="max-w-full h-auto rounded-lg shadow-lg"
          style={{ maxWidth: '400px' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `
              <div class="p-8 text-center text-red-500 border border-red-300 rounded-lg">
                <p>Failed to load SVG template</p>
                <p class="text-sm mt-1">${svgTemplate.uri}</p>
              </div>
            `;
          }}
        />
        <p className="mt-4 text-xs text-gray-500 text-center">
          Note: SVG placeholder replacement not yet implemented.
          <br />
          This shows the raw SVG template.
        </p>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700">
          {mode === 'simple' ? 'Simple Card Preview' : 'SVG Template Preview'}
        </h3>
        <p className="text-xs text-gray-500">
          {lang === 'en-CA' ? 'English (Canada)' : 'Français (Canada)'}
        </p>
      </div>

      <div className="flex justify-center">
        {mode === 'simple' ? renderSimpleCard() : renderSvgTemplate()}
      </div>

      {/* Sample Data Summary */}
      {Object.keys(sampleData).length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Sample Data
          </h4>
          <div className="space-y-1">
            {Object.entries(sampleData).map(([path, value]) => (
              <div key={path} className="flex justify-between text-xs">
                <span className="text-gray-500 font-mono">{path}:</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
