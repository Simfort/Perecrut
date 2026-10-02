import { create } from "zustand";

type Candidates = {
  vacancy: string;
  description: string;
  firstname: string;
  lastname: string;
}[];

interface UseCandidates {
  currentCandidates: Candidates | null;
  setCurrentCandidates(currentVacancies: Candidates | null): void;
}

export const useCurrentCandidates = create<UseCandidates>((set) => ({
  currentCandidates: null,
  setCurrentCandidates(currentCandidates) {
    set({ currentCandidates });
  },
}));
