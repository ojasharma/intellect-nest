"use client";

import { useState, useEffect } from "react";
import { getResponsiveValues } from "@/src/lib/constants";

// Custom hook for responsive values
export const useResponsiveValues = () => {
  const [responsiveValues, setResponsiveValues] = useState(() =>
    getResponsiveValues()
  );

  useEffect(() => {
    const handleResize = () => {
      setResponsiveValues(getResponsiveValues());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return responsiveValues;
};
