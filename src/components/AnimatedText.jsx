"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AnimatedText() {
  const lines = [Array.from("Learn Chess,"), Array.from("The Right Way.")];

  // Which gap is currently highlighted
  const [hoveredGap, setHoveredGap] = useState(null);

  // State to dynamically control the animation speed
  const [transitionDuration, setTransitionDuration] = useState(1000);

  // Ref to store the timeout ID for the collapse animation
  const collapseTimeoutRef = useRef(null);

  const containerRefs = [useRef(null), useRef(null)];

  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (lineIndex, e) => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }

    const container = containerRefs[lineIndex].current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const letters = lines[lineIndex];
    const letterWidth = rect.width / letters.length;
    const rawGap = Math.floor(x / letterWidth);
    const posInLetter = (x % letterWidth) / letterWidth;

    const newGap = {
      lineIndex,
      gapIndex: posInLetter > 0.5 ? rawGap : rawGap - 1,
    };

    if (
      newGap.gapIndex !== hoveredGap?.gapIndex ||
      newGap.lineIndex !== hoveredGap?.lineIndex
    ) {
      setTransitionDuration(500); // Fast expansion
      setHoveredGap(newGap);
    }
  };

  const handleMouseLeave = () => {
    collapseTimeoutRef.current = window.setTimeout(() => {
      setTransitionDuration(1000); // Slow return
      setHoveredGap(null);
    }, 500);
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: "7vw",
        fontWeight: "bold",
        lineHeight: 1.2,
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {lines.map((letters, lineIndex) => (
        <div
          key={lineIndex}
          ref={containerRefs[lineIndex]}
          className="relative inline-block"
          onMouseMove={(e) => handleMouseMove(lineIndex, e)}
          onMouseLeave={handleMouseLeave}
          style={{ whiteSpace: "nowrap" }}
        >
          {letters.map((letter, i) => (
            <React.Fragment key={i}>
              <span
                className="transition-transform ease-in-out"
                style={{
                  display: "inline-block",
                  paddingBottom: "0.15em",
                  background:
                    "linear-gradient(to bottom, #a3c5ff 2%, #005eff 98%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                  width: letter === " " ? "0.4em" : "auto",
                  transitionDuration: `${transitionDuration}ms`,
                  transform:
                    hoveredGap?.lineIndex === lineIndex &&
                    hoveredGap.gapIndex === i - 1
                      ? "translateX(5px)"
                      : hoveredGap?.lineIndex === lineIndex &&
                        hoveredGap.gapIndex === i
                      ? "translateX(-5px)"
                      : "translateX(0)",
                }}
              >
                {letter}
              </span>
              {i < letters.length - 1 && (
                <span
                  className="inline-block transition-all ease-in-out"
                  style={{
                    width:
                      hoveredGap?.lineIndex === lineIndex &&
                      hoveredGap.gapIndex === i
                        ? "0.8em"
                        : "0em",
                    height: 0,
                    verticalAlign: "middle",
                    transitionDuration: `${transitionDuration}ms`,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
