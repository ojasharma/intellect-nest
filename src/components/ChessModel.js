"use client";
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export function ChessModel(props) {
  const { scene } = useGLTF("/models/chess.glb");

  useEffect(() => {
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

    const unit = 3.2;

    // HIDE
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

    // MOVE
    move("Circle001", -3 * unit, 0, 3 * unit);
    move("Circle004", 6 * unit, 0, 0);
    move("Circle", 3 * unit, 0, 3.2);
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
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/chess.glb");
