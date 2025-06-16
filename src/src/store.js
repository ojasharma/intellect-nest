// src/store.js

import { create } from "zustand";

export const useScrollStore = create((set) => ({
  scrollPercentage: 0,
  setScrollPercentage: (percentage) => set({ scrollPercentage: percentage }),
}));
