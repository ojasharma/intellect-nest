// In Scene.js

import React, { useState } from "react"; // Keep 'React' for React.memo
import { Canvas } from "@react-three/fiber";
import { Environment, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Import Scene Components
import AdjustCamera from "@/components/scene/AdjustCamera";
import MaterialFixer from "@/components/scene/MaterialFixer";
import ChessWrapper from "@/components/scene/ChessWrapper";

// Step 2: Wrap the component in React.memo
const Scene = React.memo(function Scene({ scrollToPercent, totalPhases }) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-10">
      <Canvas
        camera={{ fov: 45 }}
        gl={{ alpha: true, preserveDrawingBuffer: true }}
        style={{ background: "transparent" }}
        dpr={dpr}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />

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

        <Environment preset="night" background={false} />
        <AdjustCamera />
        <MaterialFixer />
        <ChessWrapper
          scrollToPercent={scrollToPercent}
          totalPhases={totalPhases}
        />

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
});

export default Scene;
