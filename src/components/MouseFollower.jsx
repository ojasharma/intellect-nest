"use client";

import { useEffect, useRef, useState } from "react";

const MouseFollower = () => {
  const circleSize =
    typeof window !== "undefined" ? window.innerWidth * 0.04 : 50;
  const radius = circleSize / 2;

  const directions = [
    { dx: 1, dy: 0 }, // horizontal
    { dx: 0, dy: 1 }, // vertical
  ];

  const mousePos = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const lastMoveTime = useRef(Date.now());
  const requestRef = useRef(null);

  const [bubbles, setBubbles] = useState(() =>
    directions.map(() => ({
      position: {
        x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
        y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
      },
      velocity: { x: 0, y: 0 },
      isMoving: false,
      offsetPhase: Math.random() * 1000,
    }))
  );

  const linearOscillation = (time, period) => {
    const t = (time % period) / period;
    return t < 0.5 ? 4 * t - 1 : 3 - 4 * t;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();
    };

    const updatePosition = () => {
      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - lastMoveTime.current;
      const period = 4000;

      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble, i) => {
          const dir = directions[i];
          const oscValue = linearOscillation(
            bubble.offsetPhase + currentTime,
            period
          );
          const offsetMagnitude = 40;

          const offsetX = oscValue * offsetMagnitude * dir.dx;
          const offsetY = oscValue * offsetMagnitude * dir.dy;

          const dx = mousePos.current.x + offsetX - bubble.position.x;
          const dy = mousePos.current.y + offsetY - bubble.position.y;

          const newVelocity = {
            x: dx * 0.07,
            y: dy * 0.07,
          };

          const newPos = {
            x: bubble.position.x + newVelocity.x,
            y: bubble.position.y + newVelocity.y,
          };

          return {
            ...bubble,
            position: newPos,
            velocity: newVelocity,
            isMoving: timeSinceLastMove <= 200,
          };
        })
      );

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {bubbles.map((bubble, i) => {
        const speed = Math.sqrt(
          bubble.velocity.x ** 2 + bubble.velocity.y ** 2
        );
        const maxStretch = 4.5;
        const stretchFactor = Math.min(speed / 30, maxStretch);
        const angle = Math.atan2(bubble.velocity.y, bubble.velocity.x);

        return (
          <div
            key={i}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              borderRadius: "50%",
              backgroundColor: "#12131D",
              filter: "blur(16px)",
              pointerEvents: "none",
              transform: `translate(${bubble.position.x - radius}px, ${
                bubble.position.y - radius
              }px) rotate(${angle}rad) scale(${1 + stretchFactor}, ${
                1 - stretchFactor * 0.5
              })`,
              willChange: "transform",
              zIndex: 9999,
            }}
          />
        );
      })}
    </>
  );
};

export default MouseFollower;
