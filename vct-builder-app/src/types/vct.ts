// VCT (Verifiable Credential Type) TypeScript Interfaces

export interface VCTLogo {
  uri: string;
  'uri#integrity'?: string;
}

export interface VCTSimpleRendering {
  background_color: string;
  text_color: string;
  logo?: VCTLogo;
}

export interface VCTSvgTemplate {
  uri: string;
  'uri#integrity'?: string;
  properties?: Record<string, unknown>;
}

export interface VCTRendering {
  simple?: VCTSimpleRendering;
  svg_template?: VCTSvgTemplate;
}

export interface VCTClaimDisplay {
  lang: string;
  label: string;
  description?: string;
}

export interface VCTClaim {
  path: (string | null)[];
  display: VCTClaimDisplay[];
}

export interface VCTDisplay {
  lang: string;
  name: string;
  description?: string;
  rendering?: VCTRendering;
}

export interface VCT {
  vct: string;
  name: string;
  description?: string;
  schema_uri?: string;
  'schema_uri#integrity'?: string;
  display: VCTDisplay[];
  claims: VCTClaim[];
}

// Sample data for preview
export interface SampleData {
  [claimPath: string]: string;
}

// Saved project structure
export interface SavedProject {
  id: string;
  name: string;
  vct: VCT;
  sampleData: SampleData;
  createdAt: string;
  updatedAt: string;
}

// Store state
export interface VCTStore {
  // Current VCT being edited
  currentVct: VCT;
  sampleData: SampleData;
  currentProjectId: string | null;
  currentProjectName: string;

  // Saved projects
  savedProjects: SavedProject[];

  // Actions
  setVct: (vct: VCT) => void;
  updateVctField: <K extends keyof VCT>(field: K, value: VCT[K]) => void;
  setSampleData: (data: SampleData) => void;
  updateSampleDataField: (path: string, value: string) => void;

  // Display actions
  addDisplay: (lang: string) => void;
  updateDisplay: (index: number, display: Partial<VCTDisplay>) => void;
  removeDisplay: (index: number) => void;

  // Claim actions
  addClaim: () => void;
  updateClaim: (index: number, claim: Partial<VCTClaim>) => void;
  removeClaim: (index: number) => void;

  // Project actions
  newProject: () => void;
  saveProject: (name: string) => void;
  loadProject: (id: string) => void;
  deleteProject: (id: string) => void;

  // Import/Export
  exportVct: () => string;
  importVct: (json: string) => void;
}

// Default empty VCT
export const createDefaultVct = (): VCT => ({
  vct: '',
  name: '',
  description: '',
  schema_uri: '',
  display: [
    {
      lang: 'en-CA',
      name: '',
      description: '',
      rendering: {
        simple: {
          background_color: '#1E3A5F',
          text_color: '#FFFFFF',
        },
      },
    },
    {
      lang: 'fr-CA',
      name: '',
      description: '',
      rendering: {
        simple: {
          background_color: '#1E3A5F',
          text_color: '#FFFFFF',
        },
      },
    },
  ],
  claims: [],
});
