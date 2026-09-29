import { create } from "zustand";

interface UseDate {
  date: Date;
  setDate(data: Date): void;
}

export const useDate = create<UseDate>((set) => ({
  date: new Date(),
  setDate(date) {
    set({ date });
  },
}));
