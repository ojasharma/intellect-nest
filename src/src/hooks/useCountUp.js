"use client";

import { useState, useEffect } from "react";

// Custom hook for counting animation
export const useCountUp = (end, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.round(end * progress));

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);
    // Cleanup function
    return () => clearInterval(counter);
  }, [end, duration, totalFrames]);

  return count;
};
