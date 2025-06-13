"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export default function AdjustCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const radius = 7;
    const angle = -Math.PI / 2;
    camera.position.set(radius * Math.cos(angle), 5, radius * Math.sin(angle));
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null; // This component doesn't render anything itself
}
