import { ColorsParsed, TimeParsed, type Vacancy } from "@/entities/vacancies";

import { create } from "zustand";

export interface VacancyFormatted extends Omit<Vacancy, "colors" | "times"> {
  colors: ColorsParsed;
  times: TimeParsed[];
}

interface UseVacancy {
  vacancy: VacancyFormatted | null;
  setVacancy(vacancy: VacancyFormatted | null): void;
}

export const useVacancy = create<UseVacancy>((set) => ({
  vacancy: null,
  setVacancy(vacancy) {
    set({ vacancy });
  },
}));
