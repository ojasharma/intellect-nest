// app/page.tsx or pages/index.tsx (depending on your project setup)
"use client";

import React from "react";
import TrialFormModal from "@/components/modal/form"; // Adjust the path if needed

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#001f3f] text-white">
      {" "}
      {/* dark blue background */}
      <TrialFormModal />
    </div>
  );
}
