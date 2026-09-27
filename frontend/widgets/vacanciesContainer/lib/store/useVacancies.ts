import { VacancyToGetAllFormatted } from "@/entities/vacancies";
import { create } from "zustand";

interface UseVacancies {
  vacancies: VacancyToGetAllFormatted[] | null;
  setVacancies(vacancies: VacancyToGetAllFormatted[] | null): void;
}

export const useVacancies = create<UseVacancies>((set) => ({
  vacancies: null,
  setVacancies(vacancies) {
    set({ vacancies });
  },
}));
