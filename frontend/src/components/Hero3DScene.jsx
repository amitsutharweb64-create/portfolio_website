import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Interactive floating core geometry with pointer interaction
function CoreGeometry() {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const { pointer } = useThree();

  useFrame((state, delta) => {
    // Subtle pointer parallax tilt
    const targetRotX = pointer.y * 0.35;
    const targetRotY = pointer.x * 0.45;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.15;
      wireframeRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <group>
        {/* Solid inner geometric faceted core */}
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1.2}>
          <icosahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial
            color="#141824"
            roughness={0.15}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Outer glowing lime wireframe cage */}
        <mesh ref={wireframeRef} position={[0, 0, 0]} scale={1.75}>
          <octahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#a3e635"
            wireframe={true}
            emissive="#a3e635"
            emissiveIntensity={0.65}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Orbiting satellite elements
function Satellites() {
  const ringRef = useRef();
  const gemRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.25;
      ringRef.current.rotation.y += delta * 0.5;
    }
    if (gemRef.current) {
      gemRef.current.rotation.z -= delta * 0.4;
      gemRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <Float speed={2.5} rotationIntensity={1.8} floatIntensity={2}>
        <mesh ref={ringRef} position={[2.2, 1.1, -0.5]} scale={0.65}>
          <torusGeometry args={[0.7, 0.18, 16, 32]} />
          <meshStandardMaterial
            color="#a3e635"
            roughness={0.2}
            metalness={0.8}
            emissive="#84cc16"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh ref={gemRef} position={[-2.3, -1.2, -0.3]} scale={0.7}>
          <dodecahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#1f2533"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
      </Float>
    </>
  );
}

// Floating ambient particles / nodes
function ParticleField({ count = 65 }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return coords;
  }, [count]);

  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a3e635"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[480px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[8, 10, 6]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-6, -6, -4]} intensity={2.2} color="#a3e635" />
        <pointLight position={[6, -4, 4]} intensity={1.5} color="#38bdf8" />

        {/* Main interactive 3D elements */}
        <CoreGeometry />
        <Satellites />
        <ParticleField count={70} />

        {/* OrbitControls with damping for natural pointer interactions */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.3}
          rotateSpeed={0.5}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Futuristic Radial Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#a3e635]/12 rounded-full blur-[110px] pointer-events-none -z-10" />
    </div>
  );
}
