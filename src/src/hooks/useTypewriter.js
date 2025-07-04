"use client";

import { useState, useEffect } from "react";

// Custom hook for typewriter effect
export const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!text) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};
