"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export default function MaterialFixer() {
  const { scene } = useThree();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.roughness = 0.1;
        child.material.metalness = 0.5;
        child.material.envMapIntensity = 1.2;
      }
    });
  }, [scene]);

  return null; // This component doesn't render anything itself
}
