"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ChessModel } from "../../components/ChessModel";
import { useEffect, useRef, useState } from "react";

// --- Helper Components (Unchanged) ---

function AdjustCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const radius = 7;
    const angle = -Math.PI / 2;
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

function MaterialFixer() {
  const { scene } = useThree();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mat = child.material;
        mat.roughness = 0.1;
        mat.metalness = 0.5;
        mat.envMapIntensity = 1.2;
      }
    });
  }, [scene]);

  return null;
}

// --- Main Animated Component (Updated with Animation State Lock) ---

function ChessWrapper() {
  const groupRef = useRef();
  const [currentPhase, setCurrentPhase] = useState(0);
  // State to lock scrolling while the model is moving
  const [isAnimating, setIsAnimating] = useState(false);

  const phases = [
    { x: 0, y: -6, rotY: 0 },
    { x: 0, y: 0, rotY: Math.PI },
    { x: -4, y: 0, rotY: 2 * Math.PI },
    { x: 4, y: 0, rotY: 3 * Math.PI },
    { x: -4, y: 0, rotY: 4 * Math.PI },
    { x: 0, y: 0, rotY: 5 * Math.PI },
  ];

  useEffect(() => {
    const handleWheel = (event) => {
      // If an animation is already in progress, ignore new scroll events
      if (isAnimating) return;

      const isScrollingDown = event.deltaY > 0;
      const nextPhase = isScrollingDown
        ? Math.min(currentPhase + 1, phases.length - 1)
        : Math.max(currentPhase - 1, 0);

      // Only trigger a new animation if the phase is actually changing
      if (nextPhase !== currentPhase) {
        setCurrentPhase(nextPhase);
        setIsAnimating(true); // Lock scrolling
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPhase, isAnimating, phases.length]);

  useFrame(() => {
    if (!groupRef.current) return;

    const target = phases[currentPhase];
    const lerpFactor = 0.05;

    // Smoothly interpolate position and rotation
    groupRef.current.position.x +=
      (target.x - groupRef.current.position.x) * lerpFactor;
    groupRef.current.position.y +=
      (target.y - groupRef.current.position.y) * lerpFactor;
    groupRef.current.rotation.y +=
      (target.rotY - groupRef.current.rotation.y) * lerpFactor;

    // If animating, check if we've reached the destination
    if (isAnimating) {
      const positionThreshold = 0.01;
      const rotationThreshold = 0.01;

      const positionReached =
        Math.abs(groupRef.current.position.x - target.x) < positionThreshold &&
        Math.abs(groupRef.current.position.y - target.y) < positionThreshold;

      const rotationReached =
        Math.abs(groupRef.current.rotation.y - target.rotY) < rotationThreshold;

      // If the model is close enough to the target, end the animation
      if (positionReached && rotationReached) {
        // Snap to the final position to ensure accuracy
        groupRef.current.position.x = target.x;
        groupRef.current.position.y = target.y;
        groupRef.current.rotation.y = target.rotY;

        setIsAnimating(false); // Unlock scrolling for the next event
      }
    }
  });

  return (
    <group
      ref={groupRef}
      scale={0.08}
      position={[phases[0].x, phases[0].y, 0]}
      rotation={[0, phases[0].rotY, 0]}
    >
      <ChessModel />
    </group>
  );
}

// --- Main Page Component (Unchanged) ---

export default function Home() {
  return (
    <>
      <div style={{ height: "100vh" }} />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Canvas camera={{ fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} />
          <Environment preset="city" />

          <AdjustCamera />
          <MaterialFixer />
          <ChessWrapper />
        </Canvas>
      </div>
    </>
  );
}
