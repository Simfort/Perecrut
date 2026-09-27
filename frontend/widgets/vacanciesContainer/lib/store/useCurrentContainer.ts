import { create } from "zustand";

interface UseCurrentContainer {
  current: number;
  setCurrent(current: number): void;
}

export const useCurrentContainer = create<UseCurrentContainer>((set) => ({
  current: 0,
  setCurrent(current) {
    set({ current });
  },
}));
