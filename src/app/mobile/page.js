"use client";

import React from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import LiquidGlassWrapper from "@/components/M_LiquidGlassWrapper";

// --- DYNAMIC IMPORTS for LAZY LOADING ---
const FeatureSection = dynamic(() => import('@/components/sections/M_FeatureSection'));
const StatsSection = dynamic(() => import('@/components/sections/M_StatsSection'));
const InstructorsSection = dynamic(() => import('@/components/sections/M_InstructorSection'));
const ReviewsSection = dynamic(() => import('@/components/sections/M_ReviewSection'));
const FAQSection = dynamic(() => import('@/components/sections/M_FAQSection'));
const Footer = dynamic(() => import('@/components/sections/M_Footer'));

export default function MobilePage() {
  return (
    <LiquidGlassWrapper>
      <main className="relative flex flex-col items-center overflow-hidden text-white">
        <Image
          src="/bluenoise.png"
          alt="Bluenoise background"
          layout="fill"
          objectFit="cover"
          className="fixed pointer-events-none select-none z-[-1] opacity-20"
          priority
        />

        {/* --- HERO SECTION --- */}
        <section className="w-full h-screen flex flex-col justify-center items-center text-center p-4">
          <Image src="/logo.png" alt="Intellect Nest Logo" width={120} height={120} priority />
          <h1 className="text-4xl font-bold mt-4">The Intellect Nest</h1>
          <p className="mt-2 text-lg">Nurturing Young Minds Through Chess</p>
          <a
            href="#features"
            className="mt-8 px-8 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Learn More
          </a>
        </section>

        {/* --- LAZY-LOADED CONTENT SECTIONS --- */}
        <FeatureSection />
        <StatsSection />
        <InstructorsSection />
        <ReviewsSection />
        <FAQSection />
        <Footer />
        
      </main>
    </LiquidGlassWrapper>
  );
}