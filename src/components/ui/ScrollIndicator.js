"use client";

import React from "react";
import Scroll from "@/components/ui/Scroll";

export default function ScrollIndicator({ scrollFadeClass }) {
  return (
    <div
      className={`absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 z-30 ${scrollFadeClass}`}
    >
      <Scroll />
    </div>
  );
}
