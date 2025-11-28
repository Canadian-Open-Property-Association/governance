import { useState } from 'react';
import { useVctStore } from '../../store/vctStore';
import { VCTClaim, VCTClaimDisplay } from '../../types/vct';

export default function ClaimsForm() {
  const currentVct = useVctStore((state) => state.currentVct);
  const addClaim = useVctStore((state) => state.addClaim);
  const updateClaim = useVctStore((state) => state.updateClaim);
  const removeClaim = useVctStore((state) => state.removeClaim);
  const sampleData = useVctStore((state) => state.sampleData);
  const updateSampleDataField = useVctStore((state) => state.updateSampleDataField);

  const [expandedClaim, setExpandedClaim] = useState<number | null>(null);

  const updateClaimPath = (claimIndex: number, pathIndex: number, value: string) => {
    const claim = currentVct.claims[claimIndex];
    const newPath = [...claim.path];
    newPath[pathIndex] = value === '' ? '' : value;
    updateClaim(claimIndex, { path: newPath });
  };

  const addPathSegment = (claimIndex: number) => {
    const claim = currentVct.claims[claimIndex];
    updateClaim(claimIndex, { path: [...claim.path, ''] });
  };

  const removePathSegment = (claimIndex: number, pathIndex: number) => {
    const claim = currentVct.claims[claimIndex];
    const newPath = claim.path.filter((_, i) => i !== pathIndex);
    updateClaim(claimIndex, { path: newPath.length > 0 ? newPath : [''] });
  };

  const updateClaimDisplay = (
    claimIndex: number,
    lang: string,
    field: keyof VCTClaimDisplay,
    value: string
  ) => {
    const claim = currentVct.claims[claimIndex];
    const newDisplay = claim.display.map((d) =>
      d.lang === lang ? { ...d, [field]: value } : d
    );
    updateClaim(claimIndex, { display: newDisplay });
  };

  const getClaimPathString = (claim: VCTClaim) => {
    return claim.path.filter(Boolean).join('.');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Claims</h3>
        <button
          type="button"
          onClick={addClaim}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center gap-1"
        >
          <span>+</span> Add Claim
        </button>
      </div>

      {currentVct.claims.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p>No claims defined yet.</p>
          <p className="text-sm">Click "Add Claim" to define credential attributes.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {currentVct.claims.map((claim, claimIndex) => (
            <div
              key={claimIndex}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Claim Header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  setExpandedClaim(expandedClaim === claimIndex ? null : claimIndex)
                }
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">
                    {expandedClaim === claimIndex ? '▼' : '▶'}
                  </span>
                  <span className="font-medium text-gray-800">
                    {getClaimPathString(claim) || '(unnamed)'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {claim.display.find((d) => d.lang === 'en-CA')?.label || ''}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeClaim(claimIndex);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              {/* Claim Details */}
              {expandedClaim === claimIndex && (
                <div className="p-4 space-y-4 border-t border-gray-200">
                  {/* Path Builder */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      JSON Path
                    </label>
                    <div className="space-y-2">
                      {claim.path.map((segment, pathIndex) => (
                        <div key={pathIndex} className="flex items-center gap-2">
                          {pathIndex > 0 && (
                            <span className="text-gray-400 text-sm">.</span>
                          )}
                          <input
                            type="text"
                            value={segment || ''}
                            onChange={(e) =>
                              updateClaimPath(claimIndex, pathIndex, e.target.value)
                            }
                            placeholder={pathIndex === 0 ? 'credentialSubject' : 'fieldName'}
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                          />
                          {claim.path.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePathSegment(claimIndex, pathIndex)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addPathSegment(claimIndex)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add path segment
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Full path: [{claim.path.map((s) => `"${s}"`).join(', ')}]
                    </p>
                  </div>

                  {/* Display Labels */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* English */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700">
                        English (en-CA)
                      </h5>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={
                            claim.display.find((d) => d.lang === 'en-CA')?.label || ''
                          }
                          onChange={(e) =>
                            updateClaimDisplay(claimIndex, 'en-CA', 'label', e.target.value)
                          }
                          placeholder="Field Label"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={
                            claim.display.find((d) => d.lang === 'en-CA')?.description ||
                            ''
                          }
                          onChange={(e) =>
                            updateClaimDisplay(
                              claimIndex,
                              'en-CA',
                              'description',
                              e.target.value
                            )
                          }
                          placeholder="Field description"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* French */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700">
                        Français (fr-CA)
                      </h5>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Libellé
                        </label>
                        <input
                          type="text"
                          value={
                            claim.display.find((d) => d.lang === 'fr-CA')?.label || ''
                          }
                          onChange={(e) =>
                            updateClaimDisplay(claimIndex, 'fr-CA', 'label', e.target.value)
                          }
                          placeholder="Libellé du champ"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={
                            claim.display.find((d) => d.lang === 'fr-CA')?.description ||
                            ''
                          }
                          onChange={(e) =>
                            updateClaimDisplay(
                              claimIndex,
                              'fr-CA',
                              'description',
                              e.target.value
                            )
                          }
                          placeholder="Description du champ"
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sample Data */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sample Value (for preview)
                    </label>
                    <input
                      type="text"
                      value={sampleData[getClaimPathString(claim)] || ''}
                      onChange={(e) =>
                        updateSampleDataField(getClaimPathString(claim), e.target.value)
                      }
                      placeholder="Enter sample value..."
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
