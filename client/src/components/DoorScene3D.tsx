import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

function SteelDoor() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={0.85}>
      {/* Frame */}
      <RoundedBox args={[2.1, 3.1, 0.18]} radius={0.03} smoothness={4} position={[0, 0, -0.12]}>
        <meshStandardMaterial color="#17191a" metalness={0.6} roughness={0.6} />
      </RoundedBox>

      {/* Door panel: signature amber-bronze steel finish so it reads clearly against the dark backdrop */}
      <RoundedBox args={[1.85, 2.85, 0.14]} radius={0.02} smoothness={4} position={[0, 0, 0.02]}>
        <meshStandardMaterial color="#d9821f" metalness={0.75} roughness={0.3} />
      </RoundedBox>

      {/* Vertical silver accent line, contrasting against the amber panel */}
      <mesh position={[-0.55, 0, 0.11]}>
        <boxGeometry args={[0.045, 2.6, 0.02]} />
        <meshStandardMaterial color="#e8e4dc" metalness={0.6} roughness={0.25} emissive="#e8e4dc" emissiveIntensity={0.12} />
      </mesh>

      {/* Handle: polished chrome for contrast against the amber panel */}
      <mesh position={[0.7, -0.1, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 16]} />
        <meshStandardMaterial color="#f2f3f4" metalness={0.95} roughness={0.12} />
      </mesh>
      <mesh position={[0.7, 0.05, 0.1]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#f2f3f4" metalness={0.95} roughness={0.12} />
      </mesh>
    </group>
  );
}

/** Interactive steel-door abstraction for the Applications section: auto-rotates slowly, and drag to spin
 * manually via OrbitControls (zoom/pan disabled so it can't get lost). */
export default function DoorScene3D() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [3.1, 0.6, 3.9], fov: 42 }} gl={{ antialias: true, alpha: true }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.5} color="#9aa3a8" />
      <directionalLight position={[3, 4, 2]} intensity={1.4} color="#fff4e0" />
      <pointLight position={[-3, -1, -2]} intensity={0.6} color="#f5a623" />
      <pointLight position={[0, 2, -3]} intensity={0.9} color="#7fa8bd" />

      <Suspense fallback={null}>
        <SteelDoor />
        <ContactShadows position={[0, -1.32, 0]} opacity={0.5} scale={5} blur={2.2} far={1.6} color="#000000" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.1}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.35}
      />
    </Canvas>
  );
}
