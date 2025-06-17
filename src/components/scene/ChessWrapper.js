"use client";

import React, { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { ChessModel } from "../ChessModel";
import { useScrollStore } from "@/src/store";

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
  { x: 0, y: 0, z: 0, rotY: 1 * Math.PI, rotX: 0 },
  { x: 0, y: 0, z: 0, rotY: 1 * Math.PI, rotX: -Math.PI / 3.8 },
];

export default function ChessWrapper({ scrollToPercent, totalPhases }) {
  const groupRef = useRef();
  const scrollPercentage = useScrollStore((state) => state.scrollPercentage);

  const handlePointerClick = useCallback(
    (event) => {
      event.stopPropagation();
      const currentScroll = useScrollStore.getState().scrollPercentage;
      const phaseUnit = 100 / totalPhases;

      if (currentScroll >= phaseUnit * 0.9 && currentScroll < phaseUnit * 2) {
        scrollToPercent(phaseUnit * 3.01, 2000);
      } else if (
        currentScroll >= phaseUnit * 2.9 &&
        currentScroll < phaseUnit * 4
      ) {
        scrollToPercent(phaseUnit * 5.1, 2000);
      } else if (
        currentScroll >= phaseUnit * 4.9 &&
        currentScroll < phaseUnit * 6
      ) {
        scrollToPercent(phaseUnit * 7.1, 2000);
      } else if (
        currentScroll >= phaseUnit * 6.9 &&
        currentScroll < phaseUnit * 8
      ) {
        scrollToPercent(phaseUnit * 9.1, 2000);
      } else if (
        currentScroll >= phaseUnit * 8.9 &&
        currentScroll < phaseUnit * 10
      ) {
        scrollToPercent(phaseUnit * 11, 2000);
      } else if (
        currentScroll < phaseUnit * 1
      ) {
        scrollToPercent(phaseUnit * 1, 2000);
      }
      
      
    },
    [scrollToPercent, totalPhases]
  );

  const getCurrentTransform = (progress) => {
    if (progress >= 1) return phases[phases.length - 1];
    const totalTransitions = phases.length - 1;
    const phaseProgress = progress * totalTransitions;
    const currentIndex = Math.floor(phaseProgress);
    if (currentIndex >= totalTransitions) return phases[totalTransitions];
    const localProgress = phaseProgress - currentIndex;
    const from = phases[currentIndex];
    const to = phases[currentIndex + 1];
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
      <ChessModel totalPhases={totalPhases} />
    </group>
  );
}
