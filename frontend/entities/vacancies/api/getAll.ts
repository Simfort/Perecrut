"server-only";

import { BACKEND_URL } from "@/shared/constants";
import { Vacancy } from "../model/vacancy";
import { Candidate } from "@/entities/candidates/model/candidate";

export type VacancyToGetAllFormatted = Pick<
  Vacancy,
  | "description"
  | "created_at"
  | "id"
  | "salary_max"
  | "salary_min"
  | "emp_type"
  | "organization"
  | "title"
> & {
  candidates: Pick<Candidate, "firstname" | "lastname" | "description">[];
};

export const getAll = async (token: string) => {
  const res = await fetch(`${BACKEND_URL}/vacancies/`, {
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    console.log(await res.json());
    return false;
  }
  const data: { data: VacancyToGetAllFormatted[] } = await res.json();
  return data.data;
};
