// pages/faq.js
"use client";

import React from "react";
import FAQComponent from "@/components/sections/FAQSection";

export default function FAQPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4"
      style={{
        backgournd:"black",
      }}
    >
      <FAQComponent />
    </div>
  );
}
