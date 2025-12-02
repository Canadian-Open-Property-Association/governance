# Credential Branding

This section contains VCT (Verifiable Credential Type) branding files for COPA-managed credentials.

VCT branding files define how credentials are displayed in wallets and verification interfaces, including:

- Credential names and descriptions (localized)
- Visual styling (colors, logos, backgrounds)
- Claim labels and display properties
- SVG templates for credential rendering

## Available VCT Branding Files

{% set vct_files = get_vct_files() %}
{% if vct_files %}
| Name | Description | File |
|------|-------------|------|
{% for vct in vct_files %}
| {{ vct.name }} | {{ vct.description }} | [{{ vct.filename }}](vct-types/{{ vct.filename }}) |
{% endfor %}
{% else %}
*No VCT branding files have been added yet.*

Use the [VCT Builder](https://vct-builder-app.onrender.com){:target="_blank"} to create new credential branding files.
{% endif %}

## Creating New VCT Branding Files

1. Sign in to the [VCT Builder](https://vct-builder-app.onrender.com){:target="_blank"} with your GitHub account
2. Create or edit a VCT branding configuration
3. Save to the COPA governance repository (creates a Pull Request)
4. Once approved and merged, the VCT will appear in the list above
