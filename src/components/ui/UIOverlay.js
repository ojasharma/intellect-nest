"use client";

import React from "react";
import AnimatedText from "@/components/AnimatedText";

export default function UIOverlay() {
  return (
    <div className="relative w-full h-full flex flex-col items-center z-20 pt-[5vh]">
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: "8vw", height: "auto", marginBottom: "5vh" }}
      />
      <div className="flex-grow flex items-start justify-center">
        <AnimatedText />
      </div>
    </div>
  );
}
