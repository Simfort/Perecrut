import { VacancyToGetAllFormatted } from "@/entities/vacancies";
import { create } from "zustand";

interface UseVacancies {
  currentVacancies: VacancyToGetAllFormatted[] | null;
  setCurrentVacancies(
    currentVacancies: VacancyToGetAllFormatted[] | null,
  ): void;
}

export const useCurrentVacancies = create<UseVacancies>((set) => ({
  currentVacancies: null,
  setCurrentVacancies(currentVacancies) {
    set({ currentVacancies });
  },
}));
