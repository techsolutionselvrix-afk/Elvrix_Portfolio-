import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function RobotHead() {
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (headRef.current) {
      // state.pointer x and y are normalized between -1 and 1
      const targetX = (state.pointer.y * Math.PI) / 6; // Look up/down (limited range)
      const targetY = (state.pointer.x * Math.PI) / 3; // Look left/right (wider range)
      
      // Smoothly interpolate current rotation to target rotation
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetX, 0.1);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.1);
    }
  });

  return (
    <group ref={headRef} position={[0, 1.2, 0]}>
      {/* Head Box */}
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.0]} />
        <meshStandardMaterial color="#9caf9a" roughness={0.5} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-1.15, 0, 0]}>
        <boxGeometry args={[0.4, 0.8, 1.0]} />
        <meshStandardMaterial color="#889986" roughness={0.6} />
      </mesh>
      <mesh position={[1.15, 0, 0]}>
        <boxGeometry args={[0.4, 0.8, 1.0]} />
        <meshStandardMaterial color="#889986" roughness={0.6} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8]} />
        <meshStandardMaterial color="#c2a466" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.16]} />
        <meshStandardMaterial color="#e5e0cc" roughness={0.4} />
      </mesh>
      
      {/* Screen / Face Bezel Area */}
      <mesh position={[0, 0, 1.01]}>
        <boxGeometry args={[1.8, 1.8, 0.05]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} />
      </mesh>
      
      {/* Screen Grid Lines (Subtle) */}
      <mesh position={[0, 0, 1.037]}>
        <planeGeometry args={[1.75, 1.75]} />
        {/* We use a basic material with a wireframe for the grid look */}
        <meshBasicMaterial 
          color="#333" 
          wireframe 
          transparent 
          opacity={0.5} 
        />
      </mesh>
      
      {/* Eyes Group */}
      <group position={[0, 0, 1.04]}>
        {/* Left Eye */}
        <group position={[-0.4, 0, 0]}>
          <mesh scale={[1.6, 0.5, 1]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh scale={[1.6, 0.5, 1]} position={[0, 0, 0.01]}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color="#ffdd55" />
          </mesh>
        </group>
        
        {/* Right Eye */}
        <group position={[0.4, 0, 0]}>
          <mesh scale={[1.6, 0.5, 1]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh scale={[1.6, 0.5, 1]} position={[0, 0, 0.01]}>
            <circleGeometry args={[0.08, 32]} />
            <meshBasicMaterial color="#ffdd55" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function RobotBody() {
  return (
    <group position={[0, -1.2, 0]}>
      {/* Main Body */}
      <mesh>
        <boxGeometry args={[2.5, 2.6, 2.2]} />
        <meshStandardMaterial color="#9caf9a" roughness={0.5} />
      </mesh>
      
      {/* Belt / Ring */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.7, 0.25, 2.4]} />
        <meshStandardMaterial color="#c2a466" roughness={0.4} metalness={0.5} />
      </mesh>
      
      {/* Base Platform */}
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.8]} />
        <meshStandardMaterial color="#e5e0cc" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        
        {/* Float adds a gentle hover effect to the whole robot */}
        <Float floatIntensity={1} rotationIntensity={0} speed={2}>
          <group position={[0, -0.2, 0]}>
            <RobotHead />
            <RobotBody />
          </group>
        </Float>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
