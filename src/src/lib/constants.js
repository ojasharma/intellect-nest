"use client";

// Centralized constants
export const CONSTANTS = {
  TOTAL_PHASES: 11,
  VH_PER_PHASE: 66.66,
  FEATURE_POSITION: 228, // 300vh from top
  BASELINE_WIDTH: 1496, // Reference width where current sizing is perfect
};

export const PAGE_HEIGHT_VH = CONSTANTS.TOTAL_PHASES * CONSTANTS.VH_PER_PHASE;

// Function to calculate responsive values based on viewport width
export const getResponsiveValues = () => {
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1496;
  const scaleFactor = viewportWidth / CONSTANTS.BASELINE_WIDTH;

  return {
    featureScale: 1.6 * scaleFactor,
    featureWidth: 710 * scaleFactor,
    featureGap: 24 * scaleFactor,
    featurePadding: 24 * scaleFactor,
    featureIconSize: 64 * scaleFactor,
    featureBorderRadius: 24 * scaleFactor,
    featureTextSize: 1.5 * scaleFactor,
    featureMarginTop: 16 * scaleFactor,
    statsWidth: 550 * scaleFactor,
    statsGap: 20 * scaleFactor,
    statsPadding: 24 * scaleFactor,
    statsHeight: 220 * scaleFactor,
    statsIconSize: 40 * scaleFactor,
    statsNumberSize: 2.8 * scaleFactor,
    statsTextSize: 1 * scaleFactor,
    statsBorderRadius: 24 * scaleFactor,
    instructorCardWidth: 300 * scaleFactor,
    instructorGap: 48 * scaleFactor,
    instructorPadding: 32 * scaleFactor,
    instructorImageSize: 160 * scaleFactor,
    instructorNameSize: 1.5 * scaleFactor,
    instructorRatingSize: 1.125 * scaleFactor,
    instructorHeadingSize: 3 * scaleFactor,
    instructorBorderRadius: 24 * scaleFactor,
  };
};
