import { create } from "zustand";

interface UseColor {
  currentColor: string | null;
  setCurrentColor: (color: string) => void;
}

export const useColor = create<UseColor>((set) => ({
  currentColor: null,
  setCurrentColor(color) {
    set({ currentColor: color });
  },
}));
