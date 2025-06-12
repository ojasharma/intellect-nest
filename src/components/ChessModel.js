"use client";
import { useGLTF } from "@react-three/drei";

export function ChessModel(props) {
  const { scene } = useGLTF("/models/chess.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/Chess.glb");
