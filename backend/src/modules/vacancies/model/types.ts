import type { Candidate } from "../../candidates/model/types.js";

export interface Vacancy {
  id?: string;
  title: string;
  description: string;
  recruter_id: string;
  emp_type: string;
  salary_min: number;
  salary_max: number;
  organization: string;
  created_at: string;
  colors?: string;
  times: string;
  interval: number;
}
export type VacancyMain = Omit<Vacancy, "recruter_id" | "created_at">;
export type VacancyWithCandidate = Pick<
  Vacancy,
  "id" | "colors" | "times" | "interval" | "title" | "description"
> & {
  candidate_id: string;
  color: string;
  firstname: string;
  lastname: string;
};
export type VacancyFormatted = Partial<
  Pick<
    Vacancy,
    "id" | "colors" | "times" | "interval" | "title" | "description"
  > & {
    candidates: {
      id: string;
      color: string;
      firstname: string;
      lastname: string;
    }[];
  }
>;

export type VacancyToGetAll = Pick<
  Vacancy,
  | "description"
  | "created_at"
  | "id"
  | "salary_max"
  | "salary_min"
  | "emp_type"
  | "organization"
  | "title"
> &
  Pick<Candidate, "firstname" | "lastname" | "vacancy_id"> & {
    candidate_description: string;
  };
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
