import { Lead } from './store';

const AIRTABLE_PAT = import.meta.env.VITE_AIRTABLE_PAT || '';
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID || 'appvoLtkzliuViGvb';
const LEADS_TABLE = 'tblfFstDS4Fyn9Exe';

export async function fetchLeadsFromAirtable(): Promise<Lead[]> {
  try {
    // If no API key, use mock data
    if (!AIRTABLE_PAT) {
      console.log('No API key found, using mock data');
      return generateMockLeads();
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${LEADS_TABLE}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.Name || 'Unknown',
      email: record.fields.Email || '',
      status: record.fields.Status || 'New',
      source: record.fields.Source || 'Unknown',
      dealSize: record.fields['Est Deal Size'] || 0,
      nextActionDate: record.fields['Next Action Date'] || null,
      createdAt: record.createdTime,
    }));
  } catch (error) {
    console.error('Failed to fetch from Airtable:', error);
    // Return mock data for development
    return generateMockLeads();
  }
}

function generateMockLeads(): Lead[] {
  const statuses = ['New', 'Qualified', 'Proposal', 'Sold', 'Lost'] as const;
  const sources = ['Website', 'Instagram', 'Reddit', 'Skool', 'Email', 'Cal.com'];
  
  return Array.from({ length: 51 }, (_, i) => ({
    id: `rec${i}`,
    name: `Lead ${i + 1}`,
    email: `lead${i + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    dealSize: Math.floor(Math.random() * 10000),
    nextActionDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

// Calculate 3D position for a lead based on its properties
export function calculateLeadPosition(lead: Lead, index: number, total: number): [number, number, number] {
  // Create a spiral galaxy distribution
  const angle = (index / total) * Math.PI * 2 * 3; // 3 spiral arms
  const radius = 5 + (lead.dealSize / 1000) * 5; // Deal size affects distance from center
  const height = (Math.random() - 0.5) * 10; // Random height spread
  
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = height + (lead.status === 'Sold' ? 5 : lead.status === 'Lost' ? -5 : 0);
  
  return [x, y, z];
}
