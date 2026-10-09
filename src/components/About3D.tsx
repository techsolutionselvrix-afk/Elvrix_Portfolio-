import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function WobbleCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Box ref={meshRef} args={[2.2, 2.2, 2.2]}>
      <MeshWobbleMaterial 
        attach="material" 
        color="#ffe500" 
        factor={0.4} 
        speed={2} 
        roughness={0.1}
        metalness={0.4}
      />
    </Box>
  );
}

export default function About3D() {
  return (
    <div className="about-3d-box">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <WobbleCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      </Canvas>
    </div>
  );
}
