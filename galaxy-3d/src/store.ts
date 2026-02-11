import { create } from 'zustand';
import { fetchLeadsFromAirtable } from './airtable';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: 'New' | 'Qualified' | 'Proposal' | 'Sold' | 'Lost';
  source: string;
  dealSize: number;
  nextActionDate: string | null;
  createdAt: string;
}

export interface DomainMetrics {
  domain: string;
  count: number;
  totalValue: number;
  avgDealSize: number;
}

interface GalaxyState {
  leads: Lead[];
  selectedLead: Lead | null;
  cameraZoom: number;
  isLoading: boolean;
  lastUpdated: Date | null;
  setLeads: (leads: Lead[]) => void;
  setSelectedLead: (lead: Lead | null) => void;
  setCameraZoom: (zoom: number) => void;
  setIsLoading: (loading: boolean) => void;
  refreshData: () => Promise<void>;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
  leads: [],
  selectedLead: null,
  cameraZoom: 1,
  isLoading: true,
  lastUpdated: null,
  setLeads: (leads) => set({ leads, lastUpdated: new Date() }),
  setSelectedLead: (lead) => set({ selectedLead: lead }),
  setCameraZoom: (zoom) => set({ cameraZoom: zoom }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  refreshData: async () => {
    set({ isLoading: true });
    try {
      const leads = await fetchLeadsFromAirtable();
      set({ leads, lastUpdated: new Date(), isLoading: false });
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      set({ isLoading: false });
    }
  },
}));

// Color mapping for status
export const statusColors: Record<string, string> = {
  'New': '#3b82f6', // blue
  'Qualified': '#06b6d4', // cyan
  'Proposal': '#eab308', // yellow
  'Sold': '#22c55e', // green
  'Lost': '#ef4444', // red
};

// Domain pillar positions
export const domainPositions: Record<string, [number, number, number]> = {
  'Sales': [20, 0, -20],
  'Fitness': [-20, 0, -20],
  'Finance': [20, 0, 20],
  'Content': [-20, 0, 20],
  'Productivity': [0, 10, -30],
  'Systems': [0, -10, 30],
};
