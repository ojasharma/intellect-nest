"use client";

import React, { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { ChessModel } from "../ChessModel";
import { useScrollStore } from "@/src/store";

// It's good practice to define constants like this outside the component
// to prevent them from being redeclared on every render.
const phases = [
  { x: 0, y: -6, z: 0, rotY: -2 * Math.PI, rotX: 0 },
  { x: 0, y: 0, z: 0, rotY: -Math.PI, rotX: 0 },
  { x: 0, y: 4.3, z: -4.5, rotY: 0.4 * Math.PI, rotX: 0 },
  { x: -3, y: -0.7, z: 0, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: -3, y: 0.7, z: 0, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: 3, y: -0.7, z: 0, rotY: 1.2 * Math.PI, rotX: 0 },
  { x: 3, y: 0.7, z: 0, rotY: 1.2 * Math.PI, rotX: 0 },
  { x: -3, y: -0.7, z: 0, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: -3, y: 0.7, z: 0, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: 0, y: 0, z: 0, rotY: 1 * Math.PI, rotX: 0 },
  { x: 0, y: 0, z: 0, rotY: 1 * Math.PI, rotX: -Math.PI / 3.8 },
  { x: 3, y: -1, z: 3, rotY: 1 * Math.PI, rotX: -Math.PI / 3.8 },
];

// --- NEW LOGIC: Defining the scroll pacing ---

// This function generates an array of scroll percentages (0.0 to 1.0)
// that mark the end of each transition.
const createTransitionPoints = () => {
  const points = [0]; // The animation starts at 0% scroll

  // Allocate 30% of the total scroll duration to the first transition.
  const firstTransitionDuration = 0.3; // 30%
  points.push(firstTransitionDuration);

  // The remaining scroll progress to be distributed among the other transitions.
  const remainingProgress = 1.0 - firstTransitionDuration;
  const numRemainingTransitions = phases.length - 2; // (total phases - 1) - first transition

  if (numRemainingTransitions > 0) {
    const subsequentTransitionDuration =
      remainingProgress / numRemainingTransitions;
    for (let i = 1; i < phases.length - 1; i++) {
      points.push(points[i] + subsequentTransitionDuration);
    }
  }

  // Ensure the last point is exactly 1.0 to avoid floating point inaccuracies.
  points[points.length - 1] = 1.0;

  return points;
};

const transitionPoints = createTransitionPoints();
// This will generate an array like: [0, 0.3, 0.37, 0.44, 0.51, ...]

// --- END OF NEW LOGIC ---

export default function ChessWrapper({ scrollToPercent, totalPhases }) {
  const groupRef = useRef();
  const scrollPercentage = useScrollStore((state) => state.scrollPercentage);

  const handlePointerClick = useCallback(
    (event) => {
      // ... (This function remains unchanged)
      event.stopPropagation();
      const currentScroll = useScrollStore.getState().scrollPercentage;
      const phaseUnit = 100 / totalPhases;

      if ( currentScroll < 25) {
        scrollToPercent(30, 2000);
      } else if (currentScroll >= 25 && currentScroll < 37) {
        scrollToPercent(44, 2000);
      } else if (currentScroll >= 40 && currentScroll < 51) {
        scrollToPercent(58, 2000);
      } else if (currentScroll >= 55 && currentScroll < 65) {
        scrollToPercent(72, 2000);
      } else if (currentScroll >= 69 && currentScroll < 79) {
        scrollToPercent(86, 2000);
      } else if (currentScroll >= 82 && currentScroll < 100) {
        scrollToPercent(100, 2000);
      }
    },
    [scrollToPercent, totalPhases]
  );

  // --- UPDATED getCurrentTransform FUNCTION ---
  const getCurrentTransform = (progress) => {
    // Handle edge cases
    if (progress <= 0) return phases[0];
    if (progress >= 1) return phases[phases.length - 1];

    // 1. Find the current segment the progress falls into.
    // We are looking for the index `i` where transitionPoints[i] <= progress < transitionPoints[i+1]
    let currentIndex = 0;
    for (let i = 0; i < transitionPoints.length - 1; i++) {
      if (progress < transitionPoints[i + 1]) {
        currentIndex = i;
        break;
      }
    }

    // 2. Get the start and end phases for this segment
    const from = phases[currentIndex];
    const to = phases[currentIndex + 1];

    // 3. Normalize the progress within this segment
    const segmentStartProgress = transitionPoints[currentIndex];
    const segmentEndProgress = transitionPoints[currentIndex + 1];
    const segmentDuration = segmentEndProgress - segmentStartProgress;

    // This is the key: calculate how far we are *inside* the current segment (0.0 to 1.0)
    const localProgress = (progress - segmentStartProgress) / segmentDuration;

    // 4. Interpolate based on the normalized local progress
    return {
      x: from.x + (to.x - from.x) * localProgress,
      y: from.y + (to.y - from.y) * localProgress,
      z: from.z + (to.z - from.z) * localProgress,
      rotY: from.rotY + (to.rotY - from.rotY) * localProgress,
      rotX: from.rotX + (to.rotX - from.rotX) * localProgress,
    };
  };

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollPercentage / 100;
    const { x, y, z, rotY, rotX } = getCurrentTransform(progress);
    groupRef.current.position.set(x, y, z);
    groupRef.current.rotation.set(rotX, rotY, 0);
  });

  return (
    <group
      ref={groupRef}
      scale={0.08}
      position={[phases[0].x, phases[0].y, phases[0].z]}
      rotation={[phases[0].rotX, phases[0].rotY, 0]}
    >
      {/* This invisible mesh captures the click for the entire scene area */}
      <mesh onClick={handlePointerClick} position-z={-20} visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>
      <ChessModel
        totalPhases={totalPhases}
        transitionPoints={transitionPoints}
      />
    </group>
  );
}
