import {
  ColorsParsed,
  TimeParsed,
  VacancyFormatted,
} from "@/entities/vacancies";

import { create } from "zustand";

export interface VacancyFormattedParsed extends Omit<
  VacancyFormatted,
  "colors" | "times"
> {
  colors: ColorsParsed;
  times: TimeParsed[];
}

interface UseVacancy {
  vacancy: VacancyFormattedParsed | null;
  setVacancy(vacancy: VacancyFormattedParsed | null): void;
}

export const useVacancy = create<UseVacancy>((set) => ({
  vacancy: null,
  setVacancy(vacancy) {
    set({ vacancy });
  },
}));
