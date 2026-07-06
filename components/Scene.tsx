"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

/** Generate particles distributed inside / on the surface of a sphere. */
function generateSphereParticles(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    // ~30 % on the shell, rest volumetrically distributed
    const r = Math.random() > 0.7 ? radius : Math.cbrt(Math.random()) * radius;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

// ---------------------------------------------------------------------------
// Primary particle cloud (~4 000 particles, #9333ea, additive blending)
// ---------------------------------------------------------------------------

function PrimaryCloud() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateSphereParticles(4000, 3.2), []);
  const { pointer } = useThree();

  useFrame((_state, delta) => {
    if (!ref.current) return;
    // Slow rotation
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.02;

    // Subtle mouse-driven tilt (lerped for smoothness)
    const targetX = pointer.y * 0.15;
    const targetY = pointer.x * 0.15;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.02;
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#9333ea"
          size={0.014}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.9}
        />
      </Points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Secondary particle cloud (~1 500 particles, #7c3aed at lower opacity,
// counter-rotating for depth parallax)
// ---------------------------------------------------------------------------

function SecondaryCloud() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateSphereParticles(1500, 3.8), []);
  const { pointer } = useThree();

  useFrame((_state, delta) => {
    if (!ref.current) return;
    // Counter-rotation
    ref.current.rotation.y -= delta * 0.03;
    ref.current.rotation.x -= delta * 0.015;

    // Subtle mouse-driven tilt (opposite direction to primary for parallax)
    const targetX = pointer.y * 0.08;
    const targetY = pointer.x * 0.08;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.015;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.015;
  });

  return (
    <group rotation={[0, 0, -Math.PI / 5]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#7c3aed"
          size={0.01}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.45}
        />
      </Points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Wireframe icosahedron with emissive purple glow
// ---------------------------------------------------------------------------

function CoreIcosahedron() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.15;
    mesh.current.rotation.y += delta * 0.22;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color="#0e0020"
          wireframe
          emissive="#9333ea"
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
}

// ---------------------------------------------------------------------------
// Exported Scene component
// ---------------------------------------------------------------------------

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#030303] via-[#0a0118] to-[#030303]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Minimal lighting — emissive materials provide the glow */}
        <ambientLight intensity={0.3} />
        <pointLight position={[8, 8, 8]} intensity={0.4} color="#c084fc" />

        <PrimaryCloud />
        <SecondaryCloud />
        <CoreIcosahedron />
      </Canvas>

      {/* Grain / noise overlay — pure CSS, no external image */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.02,
          backgroundImage:
            "repeating-radial-gradient(circle at 17% 32%, rgba(255,255,255,0.12) 0px, transparent 1px), " +
            "repeating-radial-gradient(circle at 62% 78%, rgba(255,255,255,0.10) 0px, transparent 1px), " +
            "repeating-radial-gradient(circle at 89% 14%, rgba(255,255,255,0.08) 0px, transparent 1px)",
          backgroundSize: "3px 3px, 4px 4px, 5px 5px",
        }}
      />
    </div>
  );
}
