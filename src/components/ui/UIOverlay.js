"use client";

import React from "react";
import AnimatedText from "@/components/AnimatedText";

export default function UIOverlay() {
  return (
    <div className=" w-full flex flex-col items-center z-20 pt-[5vh]">
      <img
        src="/logo.png"
        alt="Logo"
        style={{ width: "8vw", height: "auto", marginBottom: "0vh" }}
      />
      <div className="flex-grow flex flex-col items-center justify-start">
        <AnimatedText />
        <p className="text-white font-poppins text-center mt-4 text-xl">
          World-class chess training academy for your kids in a way that is truly
          affordable
        </p>
      </div>
    </div>
  );
}
