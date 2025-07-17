"use client";

import React from "react";
import UIOverlay from "@/components/ui/UIOverlay";
import ReviewsSection from "@/components/sections/M_ReviewSection";
import LiquidGlassWrapper from "@/components/M_LiquidGlassWrapper";
import FeatureSection from "@/components/sections/M_FeatureSection";


export default function MobilePage() {
  return (
    <>
      <main className="relative  flex flex-col items-center overflow-hidden">
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-[0] opacity-20"
        />
      </main>
      <LiquidGlassWrapper/>
      <UIOverlay />

      {/* Scrollable container for content */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          pointerEvents: "none",
          position: "relative",
        }}
      >
        <ReviewsSection />
        <FeatureSection />
      </div>
    </>
  );
}
