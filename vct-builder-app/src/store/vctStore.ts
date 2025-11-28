import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  VCT,
  VCTDisplay,
  VCTClaim,
  SampleData,
  SavedProject,
  VCTStore,
  createDefaultVct,
} from '../types/vct';

const generateId = () => crypto.randomUUID();

export const useVctStore = create<VCTStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentVct: createDefaultVct(),
      sampleData: {},
      currentProjectId: null,
      currentProjectName: 'Untitled',
      savedProjects: [],

      // VCT actions
      setVct: (vct: VCT) => set({ currentVct: vct }),

      updateVctField: <K extends keyof VCT>(field: K, value: VCT[K]) =>
        set((state) => ({
          currentVct: { ...state.currentVct, [field]: value },
        })),

      // Sample data actions
      setSampleData: (data: SampleData) => set({ sampleData: data }),

      updateSampleDataField: (path: string, value: string) =>
        set((state) => ({
          sampleData: { ...state.sampleData, [path]: value },
        })),

      // Display actions
      addDisplay: (lang: string) =>
        set((state) => ({
          currentVct: {
            ...state.currentVct,
            display: [
              ...state.currentVct.display,
              {
                lang,
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
          },
        })),

      updateDisplay: (index: number, displayUpdate: Partial<VCTDisplay>) =>
        set((state) => {
          const newDisplay = [...state.currentVct.display];
          newDisplay[index] = { ...newDisplay[index], ...displayUpdate };
          return {
            currentVct: { ...state.currentVct, display: newDisplay },
          };
        }),

      removeDisplay: (index: number) =>
        set((state) => ({
          currentVct: {
            ...state.currentVct,
            display: state.currentVct.display.filter((_, i) => i !== index),
          },
        })),

      // Claim actions
      addClaim: () =>
        set((state) => ({
          currentVct: {
            ...state.currentVct,
            claims: [
              ...state.currentVct.claims,
              {
                path: [''],
                display: [
                  { lang: 'en-CA', label: '', description: '' },
                  { lang: 'fr-CA', label: '', description: '' },
                ],
              },
            ],
          },
        })),

      updateClaim: (index: number, claimUpdate: Partial<VCTClaim>) =>
        set((state) => {
          const newClaims = [...state.currentVct.claims];
          newClaims[index] = { ...newClaims[index], ...claimUpdate };
          return {
            currentVct: { ...state.currentVct, claims: newClaims },
          };
        }),

      removeClaim: (index: number) =>
        set((state) => ({
          currentVct: {
            ...state.currentVct,
            claims: state.currentVct.claims.filter((_, i) => i !== index),
          },
        })),

      // Project actions
      newProject: () =>
        set({
          currentVct: createDefaultVct(),
          sampleData: {},
          currentProjectId: null,
          currentProjectName: 'Untitled',
        }),

      saveProject: (name: string) => {
        const state = get();
        const now = new Date().toISOString();

        if (state.currentProjectId) {
          // Update existing project
          set((s) => ({
            currentProjectName: name,
            savedProjects: s.savedProjects.map((p) =>
              p.id === state.currentProjectId
                ? {
                    ...p,
                    name,
                    vct: state.currentVct,
                    sampleData: state.sampleData,
                    updatedAt: now,
                  }
                : p
            ),
          }));
        } else {
          // Create new project
          const id = generateId();
          const newProject: SavedProject = {
            id,
            name,
            vct: state.currentVct,
            sampleData: state.sampleData,
            createdAt: now,
            updatedAt: now,
          };
          set((s) => ({
            currentProjectId: id,
            currentProjectName: name,
            savedProjects: [...s.savedProjects, newProject],
          }));
        }
      },

      loadProject: (id: string) => {
        const project = get().savedProjects.find((p) => p.id === id);
        if (project) {
          set({
            currentVct: project.vct,
            sampleData: project.sampleData,
            currentProjectId: project.id,
            currentProjectName: project.name,
          });
        }
      },

      deleteProject: (id: string) =>
        set((state) => ({
          savedProjects: state.savedProjects.filter((p) => p.id !== id),
          ...(state.currentProjectId === id
            ? {
                currentProjectId: null,
                currentProjectName: 'Untitled',
              }
            : {}),
        })),

      // Import/Export
      exportVct: () => {
        const { currentVct } = get();
        return JSON.stringify(currentVct, null, 2);
      },

      importVct: (json: string) => {
        try {
          const vct = JSON.parse(json) as VCT;
          set({
            currentVct: vct,
            currentProjectId: null,
            currentProjectName: 'Imported',
          });
        } catch (e) {
          console.error('Failed to import VCT:', e);
          throw new Error('Invalid VCT JSON');
        }
      },
    }),
    {
      name: 'vct-builder-storage',
      partialize: (state) => ({
        savedProjects: state.savedProjects,
      }),
    }
  )
);
