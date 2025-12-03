import json
from pathlib import Path


def define_env(env):
    @env.macro
    def get_vct_files():
        """Get list of VCT JSON files with their metadata."""
        vct_dir = Path(env.conf['docs_dir']).parent / 'credentials' / 'vct'
        vct_files = []
        if vct_dir.exists():
            for f in vct_dir.glob('*.json'):
                try:
                    with open(f) as fp:
                        data = json.load(fp)
                        vct_files.append({
                            'filename': f.name,
                            'name': data.get('name', f.stem),
                            'description': data.get('description', 'No description')
                        })
                except Exception:
                    pass
        return sorted(vct_files, key=lambda x: x['name'])
