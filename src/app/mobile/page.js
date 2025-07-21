"use client";

import React from "react";
import UIOverlay from "@/components/ui/UIOverlay";
import ReviewsSection from "@/components/sections/M_ReviewSection";
import LiquidGlassWrapper from "@/components/M_LiquidGlassWrapper";
import FeatureSection from "@/components/sections/M_FeatureSection";
import StatsSection from "@/components/sections/M_StatsSection";
import InstructorsSection from "@/components/sections/M_InstructorSection";
import FAQSection from "@/components/sections/M_FAQSection";
import Footer from "@/components/sections/M_Footer";

export default function MobilePage() {
  return (
    <>
      <main className="relative flex flex-col items-center overflow-hidden">
        <img
          src="/bluenoise.png"
          alt="Bluenoise background"
          className="fixed inset-0 w-full h-full object-cover pointer-events-none select-none z-[0] opacity-20"
        />
      </main>
      <LiquidGlassWrapper />
      <UIOverlay />

      {/* Scrollable container for content */}
      <div
        className="relative flex flex-col"
        style={{
          minHeight: "100vh",
          width: "100%",
          pointerEvents: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Each section in normal document flow */}
        <section className="relative z-10 w-full">
          <ReviewsSection />
        </section>
        <section className="relative z-10 w-full">
          <FeatureSection />
        </section>
        <section className="relative z-10 w-full">
          <StatsSection />
        </section>
        <section className="relative z-10 w-full">
          <InstructorsSection />
        </section>
        <section className="relative z-10 w-full">
          <FAQSection />
        </section>
        <section className="relative z-10 w-full">
          <Footer />
        </section>
      </div>
    </>
  );
}
