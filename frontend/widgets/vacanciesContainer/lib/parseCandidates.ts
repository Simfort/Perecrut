import { VacancyToGetAllFormatted } from "@/entities/vacancies";

export const parseCandidates = (vacancies: VacancyToGetAllFormatted[]) => {
  const result = [];

  for (const vacancy of vacancies) {
    for (const candidate of vacancy.candidates) {
      const newCandidate = { ...candidate, vacancy: vacancy.title };
      result.push(newCandidate);
    }
  }
  return result;
};
