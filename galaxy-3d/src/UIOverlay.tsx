import { useGalaxyStore, statusColors } from './store';

export default function UIOverlay() {
  const { selectedLead, setSelectedLead, leads, lastUpdated } = useGalaxyStore();

  // Count leads by status
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalPipeline = leads.reduce((sum, lead) => sum + lead.dealSize, 0);

  return (
    <>
      {/* Top Bar - Stats */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
            🌌 Plinko Galaxy
          </h1>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            <span>Total Leads: <strong>{leads.length}</strong></span>
            <span>Pipeline: <strong>${totalPipeline.toLocaleString()}</strong></span>
            {lastUpdated && (
              <span style={{ opacity: 0.6 }}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
        
        {/* Status Legend */}
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 8px ${color}`,
              }} />
              <span>{status}: {statusCounts[status] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Detail Card */}
      {selectedLead && (
        <div 
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            minWidth: '320px',
            maxWidth: '400px',
            zIndex: 200,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedLead(null)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              background: statusColors[selectedLead.status] || '#666',
              color: 'white',
              marginBottom: '12px',
            }}>
              {selectedLead.status}
            </div>
          </div>
          
          <h2 style={{ margin: '0 0 8px 0', fontSize: '22px' }}>{selectedLead.name}</h2>
          <p style={{ margin: '0 0 16px 0', opacity: 0.7, fontSize: '14px' }}>{selectedLead.email}</p>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ opacity: 0.6 }}>Source</span>
              <span>{selectedLead.source}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ opacity: 0.6 }}>Deal Size</span>
              <span style={{ fontWeight: 600 }}>${selectedLead.dealSize.toLocaleString()}</span>
            </div>
            {selectedLead.nextActionDate && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.6 }}>Next Action</span>
                <span>{new Date(selectedLead.nextActionDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '16px',
        color: 'white',
        fontSize: '13px',
        maxWidth: '280px',
        opacity: 0.8,
      }}>
        <strong style={{ display: 'block', marginBottom: '8px' }}>Controls</strong>
        <div>🖱️ Drag to rotate</div>
        <div>🔍 Scroll to zoom</div>
        <div>👆 Click spheres for details</div>
        <div>📱 Pinch & drag on mobile</div>
      </div>
    </>
  );
}
