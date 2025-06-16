"use client";

import React, { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { ChessModel } from "../ChessModel";
import { useScrollStore } from "@/src/store";

const phases = [
  { x: 0, y: -6, rotY: 0, rotX: 0 },
  { x: 0, y: 0, rotY: Math.PI, rotX: 0 },
  { x: 0, y: 1.5, rotY: Math.PI, rotX: 0 },
  { x: -4, y: -1, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: -4, y: 1, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: 4, y: -1, rotY: 1.2 * Math.PI, rotX: 0 },
  { x: 4, y: 1, rotY: 1.2 * Math.PI, rotX: 0 },
  { x: -4, y: -1, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: -4, y: 1, rotY: 0.8 * Math.PI, rotX: 0 },
  { x: 0, y: 0, rotY: 1 * Math.PI, rotX: 0 },
  { x: 0, y: 0, rotY: 1 * Math.PI, rotX: 0 },
  { x: 0, y: 0, rotY: 1 * Math.PI, rotX: -Math.PI / 3.8 },
];

export default function ChessWrapper({ scrollToPercent, totalPhases }) {
  const groupRef = useRef();
  const scrollPercentage = useScrollStore((state) => state.scrollPercentage);

  const handlePointerClick = useCallback(
    (event) => {
      event.stopPropagation();
      const currentScroll = useScrollStore.getState().scrollPercentage;
      const phaseUnit = 100 / totalPhases;

      if (currentScroll >= phaseUnit * 2 && currentScroll < phaseUnit * 4) {
        scrollToPercent(phaseUnit * 4);
      } else if (
        currentScroll >= phaseUnit * 4 &&
        currentScroll < phaseUnit * 6
      ) {
        scrollToPercent(phaseUnit * 6);
      } else if (
        currentScroll >= phaseUnit * 6 &&
        currentScroll < phaseUnit * 8
      ) {
        scrollToPercent(phaseUnit * 8);
      } else if (currentScroll >= phaseUnit * 8 && currentScroll < 100) {
        scrollToPercent(100);
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
      rotY: from.rotY + (to.rotY - from.rotY) * localProgress,
      rotX: from.rotX + (to.rotX - from.rotX) * localProgress,
    };
  };

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollPercentage / 100;
    const { x, y, rotY, rotX } = getCurrentTransform(progress);
    groupRef.current.position.set(x, y, 0);
    groupRef.current.rotation.set(rotX, rotY, 0);
  });

  return (
    <group
      ref={groupRef}
      scale={0.08}
      position={[phases[0].x, phases[0].y, 0]}
      rotation={[phases[0].rotX, phases[0].rotY, 0]}
    >
      <mesh onClick={handlePointerClick} position-z={-20} visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial />
      </mesh>
      <ChessModel totalPhases={totalPhases} />
    </group>
  );
}
