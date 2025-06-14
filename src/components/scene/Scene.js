"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Import Scene Components
import AdjustCamera from "@/components/scene/AdjustCamera";
import MaterialFixer from "@/components/scene/MaterialFixer";
import ChessWrapper from "@/components/scene/ChessWrapper";

export default function Scene({ scrollPercentage, scrollToPercent }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-10">
      <Canvas
        camera={{ fov: 45 }}
        gl={{ alpha: true, preserveDrawingBuffer: true }}
        style={{ background: "transparent" }}
      >
        {/* Lights */}
        <ambientLight intensity={3.5} color="#6c80b5" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={5.5}
          color="#6c80b5"
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={4.5}
          color="#6c80b5"
        />

        {/* Environment & Scene Contents */}
        <Environment preset="night" background={false} />
        <AdjustCamera />
        <MaterialFixer />
        <ChessWrapper
          scrollPercentage={scrollPercentage}
          scrollToPercent={scrollToPercent}
        />

        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={0.8}
            radius={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
