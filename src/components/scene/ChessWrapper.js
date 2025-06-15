"use client";

import React, { useRef } from "react"; // ❌ No longer need useEffect
import { useFrame } from "@react-three/fiber";
import { ChessModel } from "../ChessModel"; // Adjust path if needed

const phases = [
  { x: 0, y: -6, rotY: 0 },
  { x: 0, y: 0, rotY: Math.PI },
  { x: 0, y: 1.5, rotY: Math.PI },
  { x: -4, y: -1, rotY: 0.8 * Math.PI },
  { x: -4, y: 1, rotY: 0.8 * Math.PI },
  { x: 4, y: -1, rotY: 1.2 * Math.PI },
  { x: 4, y: 1, rotY: 1.2 * Math.PI },
  { x: -4, y: -1, rotY: 0.8 * Math.PI },
  { x: -4, y: 1, rotY: 0.8 * Math.PI },
  { x: 0, y: 0, rotY: 1 * Math.PI },
];

export default function ChessWrapper({ scrollPercentage, scrollToPercent }) {
  const groupRef = useRef();

  // ❌ REMOVED: The entire useEffect block that listened for scroll events is gone.
  // ❌ REMOVED: The `scrollProgress` ref is gone.

  const getCurrentTransform = (progress) => {
    if (progress >= 1) return phases[phases.length - 1];

    const totalPhases = phases.length - 1;
    const phaseProgress = progress * totalPhases;
    const currentIndex = Math.floor(phaseProgress);

    if (currentIndex >= totalPhases) {
      return phases[totalPhases];
    }

    const localProgress = phaseProgress - currentIndex;
    const fromPhase = phases[currentIndex];
    const toPhase = phases[currentIndex + 1];

    return {
      x: fromPhase.x + (toPhase.x - fromPhase.x) * localProgress,
      y: fromPhase.y + (toPhase.y - fromPhase.y) * localProgress,
      rotY: fromPhase.rotY + (toPhase.rotY - fromPhase.rotY) * localProgress,
    };
  };

  useFrame(() => {
    if (!groupRef.current) return;

    // ✅ CHANGED: We now derive progress directly from the prop.
    // Convert the 0-100 scale to a 0-1 scale for animations.
    const progress = scrollPercentage / 100;

    const { x, y, rotY } = getCurrentTransform(progress);
    groupRef.current.position.x = x;
    groupRef.current.position.y = y;
    groupRef.current.rotation.y = rotY;
  });

  return (
    <group
      ref={groupRef}
      scale={0.08}
      position={[phases[0].x, phases[0].y, 0]}
      rotation={[0, phases[0].rotY, 0]}
    >
      {/* ✅ Pass the original prop down to the model */}
      <ChessModel
        scrollPercentage={scrollPercentage}
        scrollToPercent={scrollToPercent}
      />
    </group>
  );
}
