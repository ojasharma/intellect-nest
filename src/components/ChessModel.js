"use client";

import React, { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScrollStore } from "@/src/store";

/**
 * Helper function to convert the global scroll percentage (0.0 to 1.0) into a non-linear
 * "phase progress" that respects the custom timing defined by the transitionPoints array.
 * @param {number} globalScrollProgress - The overall scroll percentage from the store (0.0 to 1.0).
 * @param {number[]} transitionPoints - The array of scroll percentages that mark the completion of each phase.
 * @returns {number} The calculated non-linear phase progress (e.g., 2.5 means halfway between phase 2 and 3).
 */
const getNonLinearPhaseProgress = (globalScrollProgress, transitionPoints) => {
  // Return a fallback if points aren't ready or are invalid.
  if (!transitionPoints || transitionPoints.length < 2) {
    return 0;
  }

  // Handle edge cases for the start and end of the scroll.
  if (globalScrollProgress <= 0) return 0;
  if (globalScrollProgress >= 1) return transitionPoints.length - 1;

  // Find the current segment the scroll progress falls into.
  // We are looking for the index `i` where transitionPoints[i] <= progress < transitionPoints[i+1].
  let currentIndex = 0;
  for (let i = 0; i < transitionPoints.length - 1; i++) {
    if (globalScrollProgress < transitionPoints[i + 1]) {
      currentIndex = i;
      break;
    }
  }
  // A safeguard for when scroll is exactly 1.0
  if (globalScrollProgress >= 1.0) {
    currentIndex = transitionPoints.length - 2;
  }

  // Normalize the progress within this specific segment to a 0.0-1.0 range.
  const segmentStartProgress = transitionPoints[currentIndex];
  const segmentEndProgress = transitionPoints[currentIndex + 1];
  const segmentDuration = segmentEndProgress - segmentStartProgress;

  const localProgress =
    segmentDuration > 0
      ? (globalScrollProgress - segmentStartProgress) / segmentDuration
      : 0;

  // The final result is the current phase index plus the normalized progress within that phase.
  return currentIndex + localProgress;
};

export function ChessModel({ totalPhases, transitionPoints, ...props }) {
  const { scene } = useGLTF("/models/chess.glb");
  const scrollPercentage = useScrollStore((state) => state.scrollPercentage);

  const initialPositions = useRef({});
  const animatedObjects = useRef({});
  const isInitialized = useRef(false);
  const unit = 2 * 3.2;

  const animationTable = [
    {
      phase: { from: 2, to: 3 },
      animations: [
        {
          object: "Circle022",
          property: "position.z",
          from: 0,
          to: -unit,
          timing: { start: 0, duration: 0.33 },
        },
        {
          object: "Circle",
          property: "position.z",
          from: 0,
          to: unit,
          timing: { start: 0.33, duration: 0.33 },
        },
        {
          object: "Circle022",
          property: "visible",
          from: true,
          to: false,
          timing: { start: 0.66, duration: 0 },
        },
        {
          object: "Circle012",
          property: "visible",
          from: true,
          to: false,
          timing: { start: 0, duration: 0 },
        },
        {
          object: "Plane001",
          property: "position.z",
          from: 0,
          to: (4.1 * unit) / 2,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane002",
          property: "position.z",
          from: 0,
          to: (6.05 * unit) / 2,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane002",
          property: "position.x",
          from: 0,
          to: (-4 * unit) / 2,
          timing: { start: 0, duration: 1 },
        },
      ],
    },
    {
      phase: { from: 4, to: 5 },
      animations: [
        {
          object: "Circle017",
          property: "position.z",
          from: 0,
          to: -2 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Circle017",
          property: "position.x",
          from: 0,
          to: 2 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Circle",
          property: "position.x",
          from: 0,
          to: -unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane002",
          property: "position.x",
          from: 0,
          to: -unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane002",
          property: "position.z",
          from: 0,
          to: -unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane001",
          property: "position.z",
          from: 0,
          to: unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane001",
          property: "position.x",
          from: 0,
          to: -unit,
          timing: { start: 0, duration: 1 },
        },
      ],
    },
    {
      phase: { from: 6, to: 7 },
      animations: [
        {
          object: "Circle023",
          property: "position.x",
          from: 0,
          to: 2 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Circle014",
          property: "position.x",
          from: 0,
          to: 2 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Circle014",
          property: "position.z",
          from: 0,
          to: unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane002",
          property: "position.z",
          from: 0,
          to: -unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane001",
          property: "position.x",
          from: 0,
          to: -2 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane001",
          property: "position.z",
          from: 0,
          to: -2 * unit,
          timing: { start: 0, duration: 1 },
        },
      ],
    },
    {
      phase: { from: 8, to: 9 },
      animations: [
        {
          object: "Circle026",
          property: "position.z",
          from: 0,
          to: -1 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Circle010",
          property: "position.z",
          from: 0,
          to: 1 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane002",
          property: "position.z",
          from: 0,
          to: 1 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane002",
          property: "position.x",
          from: 0,
          to: 2 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane001",
          property: "position.x",
          from: 0,
          to: 2 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane001",
          property: "position.z",
          from: 0,
          to: 1 * unit,
          timing: { start: 0, duration: 1 },
        },
      ],
    },
    {
      phase: { from: 10, to: 11 },
      animations: [
        {
          object: "Circle023",
          property: "position.z",
          from: 0,
          to: -1 * unit,
          timing: { start: 0, duration: 1 },
        },
        {
          object: "Plane001",
          property: "visible",
          from: true,
          to: false,
          timing: { start: 0.66, duration: 0 },
        },
        {
          object: "Plane002",
          property: "visible",
          from: true,
          to: false,
          timing: { start: 0.66, duration: 0 },
        },
        {
          object: "Circle014",
          property: "visible",
          from: true,
          to: false,
          timing: { start: 0.66, duration: 0 },
        },
      ],
    },
  ];

  const applyAnimations = (phaseProgress) => {
    // This function now directly receives the calculated non-linear phase progress.
    const currentPhaseIndex = Math.floor(phaseProgress);
    const finalOffsets = {};

    animationTable.forEach(({ phase, animations }) => {
      animations.forEach((animation) => {
        const key = `${animation.object}-${animation.property}`;
        if (!finalOffsets[key]) {
          finalOffsets[key] = { value: 0, isVisible: null };
        }

        let valueToAdd = 0;
        let visibility = null;

        if (currentPhaseIndex >= phase.to) {
          if (animation.property === "visible") {
            visibility = animation.to;
          } else {
            valueToAdd = animation.to;
          }
        } else if (
          currentPhaseIndex >= phase.from &&
          currentPhaseIndex < phase.to
        ) {
          const localProgress = Math.max(
            0,
            Math.min(1, phaseProgress - phase.from)
          );
          const { timing } = animation;
          const animProgress = Math.max(
            0,
            Math.min(
              1,
              (localProgress - timing.start) / Math.max(timing.duration, 0.001)
            )
          );

          if (animation.property === "visible") {
            visibility =
              localProgress >= timing.start ? animation.to : animation.from;
          } else {
            valueToAdd =
              animation.from + (animation.to - animation.from) * animProgress;
          }
        }

        finalOffsets[key].value += valueToAdd;
        if (visibility !== null) {
          finalOffsets[key].isVisible = visibility;
        }
      });
    });

    Object.keys(animatedObjects.current).forEach((objectName) => {
      const obj = animatedObjects.current[objectName];
      if (obj && initialPositions.current[objectName]) {
        obj.position.copy(initialPositions.current[objectName]);
        obj.visible = true;
      }
    });

    Object.keys(finalOffsets).forEach((key) => {
      const [objectName, propertyPath] = key.split(/-(.*)/s);
      const obj = animatedObjects.current[objectName];
      if (!obj) return;

      const { value, isVisible } = finalOffsets[key];
      if (propertyPath === "visible") {
        if (isVisible !== null) obj.visible = isVisible;
      } else {
        const [property, subProperty] = propertyPath.split(".");
        if (obj[property] && subProperty) {
          obj[property][subProperty] += value;
        }
      }
    });

    const circle012 = animatedObjects.current["Circle012"];
    if (circle012) {
      const key = "Circle012-visible";
      if (!finalOffsets[key] || finalOffsets[key].isVisible === null) {
        circle012.visible = currentPhaseIndex < 2;
      }
    }
  };

  useFrame(() => {
    // Check for all required data before running animations.
    if (!isInitialized.current || !totalPhases || !transitionPoints) return;

    const globalScrollProgress = scrollPercentage / 100;

    // Use the helper to translate global scroll progress into non-linear phase progress.
    const nonLinearPhaseProgress = getNonLinearPhaseProgress(
      globalScrollProgress,
      transitionPoints
    );

    // Feed the correctly calculated phase progress directly into the animation engine.
    applyAnimations(nonLinearPhaseProgress);
  });

  useLayoutEffect(() => {
    if (isInitialized.current || !scene.children.length) return;

    const move = (name, x = 0, y = 0, z = 0) => {
      const obj = scene.getObjectByName(name);
      if (obj) {
        obj.position.x += x;
        obj.position.y += y;
        obj.position.z += z;
      }
    };
    const hide = (name) => {
      const obj = scene.getObjectByName(name);
      if (obj) obj.visible = false;
    };
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

    const allAnimatedObjectNames = [
      ...new Set(
        animationTable.flatMap((phase) =>
          phase.animations.map((anim) => anim.object)
        )
      ),
    ];
    allAnimatedObjectNames.forEach((name) => {
      const obj = scene.getObjectByName(name);
      if (obj) {
        animatedObjects.current[name] = obj;
        initialPositions.current[name] = obj.position.clone();
      }
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

    isInitialized.current = true;
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/chess.glb");
