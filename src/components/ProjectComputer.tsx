import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Project {
  id: string;
  title: string;
  desc: string;
  url: string;
  tag: string;
}

export default function ProjectComputer({ project, index }: { project: Project; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Stagger animation based on index
  const offset = index * 2;

  useFrame((state) => {
    if (groupRef.current && !hovered) {
       groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + offset) * 0.15;
       groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6 + offset) * 0.05;
    } else if (groupRef.current && hovered) {
       // smoothly return to facing forward when hovered
       groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
       groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
    }
  });

  return (
    <Float floatIntensity={1.5} rotationIntensity={0} speed={2}>
      <group 
        ref={groupRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Computer Case - Wide and chunky retro style */}
        <mesh position={[0, 0.2, -0.6]}>
          <boxGeometry args={[4.0, 2.8, 1.2]} />
          <meshStandardMaterial color="#f0ede6" roughness={0.8} />
        </mesh>
        
        {/* Screen Bezel */}
        <mesh position={[0, 0.2, 0.05]}>
          <boxGeometry args={[3.6, 2.4, 0.1]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.9} />
        </mesh>

        {/* Screen Backing (dark behind the iframe) */}
        <mesh position={[0, 0.2, 0.1]}>
          <boxGeometry args={[3.4, 2.2, 0.05]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Computer Base / Stand */}
        <mesh position={[0, -1.3, -0.3]}>
          <boxGeometry args={[1.6, 0.2, 1.4]} />
          <meshStandardMaterial color="#d0cbc4" roughness={0.8} />
        </mesh>
        {/* Stand neck */}
        <mesh position={[0, -1.0, -0.3]}>
          <cylinderGeometry args={[0.5, 0.6, 0.6, 16]} />
          <meshStandardMaterial color="#e8e4df" roughness={0.8} />
        </mesh>
        
        {/* Retro detailing - disk drive slot */}
        <mesh position={[1.2, -0.9, 0]}>
          <boxGeometry args={[0.8, 0.05, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Retro detailing - power button */}
        <mesh position={[1.7, -0.9, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#ff4d00" />
        </mesh>

        {/* The Actual Web View via Html */}
        <Html 
          transform 
          position={[0, 0.2, 0.13]} 
          scale={0.065} 
        >
          <div className="retro-screen" style={{
            width: '850px', 
            height: '550px', 
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
            border: '8px solid #0a0a0a',
            borderRadius: '24px',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
          }}>
            <iframe 
              src={project.url}
              title={project.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                opacity: hovered ? 1 : 0.6,
                transition: 'opacity 0.3s',
                pointerEvents: hovered ? 'auto' : 'none'
              }}
            />
            {/* Scanlines for retro CRT feel */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 4px, 6px 100%',
              pointerEvents: 'none',
              zIndex: 10
            }}></div>
            
            {/* CRT Screen curve reflection overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)',
              pointerEvents: 'none',
              zIndex: 11
            }}></div>

            {/* Brutalist overlay inside screen */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: hovered ? 'rgba(26, 111, 255, 0.95)' : 'rgba(10, 10, 10, 0.9)',
              padding: '30px',
              color: '#fff',
              transform: hovered ? 'translateY(0)' : 'translateY(100%)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 20,
              borderTop: '6px solid #0a0a0a'
            }}>
               <span style={{ 
                 display: 'inline-block',
                 background: '#ffe500', 
                 color: '#000', 
                 padding: '6px 14px', 
                 fontSize: '14px',
                 fontFamily: '"Space Grotesk", sans-serif',
                 fontWeight: 800,
                 letterSpacing: '2px',
                 marginBottom: '16px',
                 border: '3px solid #000',
                 textTransform: 'uppercase'
               }}>{project.tag}</span>
               <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '56px', margin: '0 0 10px 0', lineHeight: 0.9, letterSpacing: '0.02em' }}>{project.title}</h3>
               <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', margin: 0, opacity: 0.9, lineHeight: 1.5 }}>{project.desc}</p>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}
