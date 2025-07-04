// src/store.js

import { create } from "zustand";

export const useScrollStore = create((set) => ({
  scrollPercentage: 0,
  setScrollPercentage: (percentage) => set({ scrollPercentage: percentage }),

  // Add these two lines to manage the hover state
  isObjectHovered: false,
  setObjectHovered: (isHovered) => set({ isObjectHovered: isHovered }),
}));
