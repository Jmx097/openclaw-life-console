import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useGalaxyStore, statusColors, domainPositions, Lead } from './store';
import { calculateLeadPosition } from './airtable';

// Lead Sphere Component
function LeadSphere({ lead, position, onClick }: { lead: Lead; position: [number, number, number]; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = statusColors[lead.status] || '#ffffff';
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[0.3 + (lead.dealSize / 10000), 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      {/* Glow effect */}
      <mesh scale={1.5}>
        <sphereGeometry args={[0.3 + (lead.dealSize / 10000), 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Domain Pillar Component
function DomainPillar({ domain, position }: { domain: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Main pillar */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.5, 0.5, 8, 16]} />
        <meshStandardMaterial 
          color="#4f46e5"
          emissive="#4f46e5"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Glow ring */}
      <mesh position={[0, 4, 0]}>
        <torusGeometry args={[1, 0.1, 8, 32]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
      </mesh>
      {/* Label */}
      <Billboard>
        <Text
          position={[0, 5, 0]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {domain}
        </Text>
      </Billboard>
    </group>
  );
}

// Galaxy Scene
function GalaxyScene() {
  const { leads, setSelectedLead } = useGalaxyStore();
  const { camera } = useThree();

  // Calculate positions for all leads
  const leadPositions = useMemo(() => {
    return leads.map((lead, index) => ({
      lead,
      position: calculateLeadPosition(lead, index, leads.length),
    }));
  }, [leads]);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      
      {/* Starfield background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#4f46e5" transparent opacity={0.1} />
      </mesh>
      
      {/* Lead spheres */}
      {leadPositions.map(({ lead, position }) => (
        <LeadSphere
          key={lead.id}
          lead={lead}
          position={position}
          onClick={() => setSelectedLead(lead)}
        />
      ))}
      
      {/* Domain pillars */}
      {Object.entries(domainPositions).map(([domain, position]) => (
        <DomainPillar key={domain} domain={domain} position={position} />
      ))}
      
      {/* Camera controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />
    </>
  );
}

// Main Galaxy Component
export default function Galaxy() {
  const { leads, isLoading, refreshData } = useGalaxyStore();

  useEffect(() => {
    refreshData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(refreshData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshData]);

  if (isLoading && leads.length === 0) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0f172a',
        color: 'white'
      }}>
        <div>Loading Galaxy...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0f172a' }}>
      <Canvas
        camera={{ position: [15, 10, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <GalaxyScene />
      </Canvas>
    </div>
  );
}
