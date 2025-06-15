"use client";
import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function ChessModel({ scrollPercentage, scrollToPercent, ...props }) {
  const { scene } = useGLTF("/models/chess.glb");
  const initialPositions = useRef({});
  const unit = 2*3.2;

  // 💡 ADD THIS: A ref to track if our one-time setup has run.
  const isInitialized = useRef(false);

  const handlePointerClick = useCallback(/* ... */);
  const handlePointerOver = useCallback(/* ... */);
  const handlePointerOut = useCallback(/* ... */);

  // ❌ REMOVED: The problematic useEffect is gone.
  // The logic will be moved into useFrame.

  useFrame(() => {
    // 💡 --- START OF THE FIX ---
    // This block runs our setup logic only ONCE.
    if (!isInitialized.current && scene.children.length > 0) {
      const move = (name, x = 0, y = 0, z = 0) => {
        const obj = scene.getObjectByName(name);
        if (obj) {
          obj.position.x += x;
          obj.position.y += y;
          obj.position.z += z;
        } else {
          console.warn(`Object not found in setup: ${name}`); // Good for debugging
        }
      };
      const hide = (name) => {
        const obj = scene.getObjectByName(name);
        if (obj) obj.visible = false;
      };

      // All your positioning and material setup logic is now here:
      [
        "Circle003",
        "Circle002",
        "Circle013",
        "Circle007",
        "Circle011",
        "Circle021",
        "Circle019",
        "Circle020",
        "Circle028",
      ].forEach(hide);
      move("Circle001", -3 * unit, 0, 3 * unit);
      move("Circle004", 6 * unit, 0, 0);
      move("Circle", 3 * unit, 0, unit);
      move("Circle014", -2 * unit, 0, 3 * unit);
      move("Circle015", -1 * unit, 0, 1 * unit);
      move("Circle006", 0, 0, 1 * unit);
      move("Circle008", 0, 0, 1 * unit);
      move("Circle010", 0, 0, 1 * unit);
      move("Circle012", 0, 0, 1 * unit);
      move("Circle023", 4 * unit, 0, -2 * unit);
      move("Circle016", 4 * unit, 0, 0);
      move("Circle017", 1 * unit, 0, -1 * unit);
      move("Circle018", -2 * unit, 0, -2 * unit);
      move("Circle022", 0, 0, -4 * unit);
      move("Circle029", 2 * unit, 0, -4 * unit);
      move("Circle026", -1 * unit, 0, -2 * unit);
      move("Circle024", 0, 0, -1 * unit);
      move("Circle027", -2 * unit, 0, 0);
      move("Plane001", 4 * unit - 0.1, 0, -1 * unit);
      move("Plane002", 2 * unit, 0, 0);

      const animatedObjects = ["Circle", "Circle022", "Plane001", "Plane002"];
      animatedObjects.forEach((name) => {
        const obj = scene.getObjectByName(name);
        if (obj) initialPositions.current[name] = obj.position.clone();
      });

      ["Plane001", "Plane002"].forEach((name) => {
        const obj = scene.getObjectByName(name);
        if (obj?.material?.isMeshStandardMaterial) {
          obj.material.emissive = new THREE.Color(
            name === "Plane002" ? 0x3a80f7 : 0xffffff
          );
          obj.material.emissiveIntensity = 2;
          obj.material.toneMapped = false;
        }
      });

      // 💡 SET THE FLAG: This ensures the setup code never runs again.
      isInitialized.current = true;
    }
    // 💡 --- END OF THE FIX ---

    // Guard to prevent animation from running before initialization is complete.
    if (
      !isInitialized.current ||
      initialPositions.current.Circle022 === undefined
    )
      return;

    // The rest of your animation logic remains the same.
    const scrollProgress = scrollPercentage / 100;
    const totalPhases = 9;
    const phaseProgress = scrollProgress * totalPhases;
    // ... (rest of your existing useFrame animation code)
    const currentIndex = Math.floor(phaseProgress);
    const circle = scene.getObjectByName("Circle"),
      circle012 = scene.getObjectByName("Circle012"),
      circle022 = scene.getObjectByName("Circle022"),
      plane001 = scene.getObjectByName("Plane001"),
      plane002 = scene.getObjectByName("Plane002");
    const animationProgress = Math.max(0, Math.min(1, phaseProgress - 2));
    const phase2to3Progress = Math.max(0, Math.min(1, phaseProgress - 2));
    const sequenceStep1 = Math.max(0, Math.min(1, phase2to3Progress * 3));
    const sequenceStep2 = Math.max(
      0,
      Math.min(1, (phase2to3Progress - 0.33) * 3)
    );
    const sequenceStep3 = phase2to3Progress > 0.66 ? 1 : 0;

    if (circle022 && initialPositions.current.Circle022) {
      circle022.position.z =
        initialPositions.current.Circle022.z - 2 * unit/2 * sequenceStep1;
      circle022.visible = sequenceStep3 === 0;
    }
    if (circle && initialPositions.current.Circle) {
      circle.position.z =
        initialPositions.current.Circle.z + 2 * unit/2 * sequenceStep2;
    }
    if (circle012) circle012.visible = currentIndex < 2;
    if (plane001 && initialPositions.current.Plane001)
      plane001.position.z =
        initialPositions.current.Plane001.z + 4.1 * unit/2 * animationProgress;
    if (plane002 && initialPositions.current.Plane002) {
      const initialPos = initialPositions.current.Plane002;
      plane002.position.z = initialPos.z + 6.05 * unit/2 * animationProgress;
      plane002.position.x = initialPos.x - 4 * unit/2 * animationProgress;
    }
  });

  return (
    <primitive
      object={scene}
      {...props}
      onClick={handlePointerClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

useGLTF.preload("/models/chess.glb");
