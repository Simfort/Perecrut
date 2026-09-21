"server-only";

import { BACKEND_URL } from "@/shared/constants";
import { VacancyFormatted } from "../model/vacancy";

export const getVacancy = async (vacancyId: string) => {
  const res = await fetch(`${BACKEND_URL}/vacancies/${vacancyId}`);
  if (!res.ok) {
    console.log(await res.json());
    return false;
  }
  const data: { data: VacancyFormatted } = await res.json();
  return data.data;
};
