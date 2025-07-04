"use client";

import React, { useEffect } from "react";

export default function CustomCursorPage() {
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const cursor = document.getElementById("custom-cursor");

    const moveCursor = (e) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className="w-screen h-screen relative bg-white overflow-hidden">
      {/* Custom Hand Cursor */}
      <div id="custom-cursor" className="fixed z-50 pointer-events-none" />

      <h1 className="text-4xl text-center mt-40 text-black">
        Your custom hand cursor is active 🖐️
      </h1>

      {/* Inline CSS for the cursor */}
      <style jsx>{`
        #custom-cursor {
          width: 48px;
          height: 48px;
          background-image: url("/hand.png");
          background-size: contain;
          background-repeat: no-repeat;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}
