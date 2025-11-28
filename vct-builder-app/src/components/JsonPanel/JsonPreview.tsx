import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useVctStore } from '../../store/vctStore';

export default function JsonPreview() {
  const currentVct = useVctStore((state) => state.currentVct);

  // Clean up the VCT object for export (remove empty optional fields)
  const cleanVct = () => {
    const cleaned: Record<string, unknown> = {
      vct: currentVct.vct,
      name: currentVct.name,
    };

    if (currentVct.description) {
      cleaned.description = currentVct.description;
    }

    if (currentVct.schema_uri) {
      cleaned.schema_uri = currentVct.schema_uri;
      if (currentVct['schema_uri#integrity']) {
        cleaned['schema_uri#integrity'] = currentVct['schema_uri#integrity'];
      }
    }

    // Clean display array
    cleaned.display = currentVct.display.map((d) => {
      const display: Record<string, unknown> = {
        lang: d.lang,
        name: d.name,
      };

      if (d.description) {
        display.description = d.description;
      }

      if (d.rendering) {
        const rendering: Record<string, unknown> = {};

        if (d.rendering.simple) {
          const simple: Record<string, unknown> = {
            background_color: d.rendering.simple.background_color,
            text_color: d.rendering.simple.text_color,
          };

          if (d.rendering.simple.logo?.uri) {
            simple.logo = {
              uri: d.rendering.simple.logo.uri,
              ...(d.rendering.simple.logo['uri#integrity'] && {
                'uri#integrity': d.rendering.simple.logo['uri#integrity'],
              }),
            };
          }

          rendering.simple = simple;
        }

        if (d.rendering.svg_template?.uri) {
          rendering.svg_template = {
            uri: d.rendering.svg_template.uri,
            ...(d.rendering.svg_template['uri#integrity'] && {
              'uri#integrity': d.rendering.svg_template['uri#integrity'],
            }),
          };
        }

        if (Object.keys(rendering).length > 0) {
          display.rendering = rendering;
        }
      }

      return display;
    });

    // Clean claims array
    if (currentVct.claims.length > 0) {
      cleaned.claims = currentVct.claims
        .filter((c) => c.path.some((p) => p)) // Only include claims with at least one path segment
        .map((c) => ({
          path: c.path.filter((p) => p), // Remove empty path segments
          display: c.display
            .filter((d) => d.label) // Only include displays with labels
            .map((d) => ({
              lang: d.lang,
              label: d.label,
              ...(d.description && { description: d.description }),
            })),
        }));
    }

    return cleaned;
  };

  const jsonString = JSON.stringify(cleanVct(), null, 2);

  return (
    <div className="h-full">
      <SyntaxHighlighter
        language="json"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.75rem',
          lineHeight: '1.5',
        }}
        wrapLines
        wrapLongLines
      >
        {jsonString}
      </SyntaxHighlighter>
    </div>
  );
}
