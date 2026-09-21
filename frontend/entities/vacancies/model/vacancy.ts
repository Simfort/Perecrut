export interface Vacancy {
  id: string;
  title: string;
  description: string;
  recruter_id: string;
  emp_type: string;
  salary_min: number;
  salary_max: number;
  organization: string;
  created_at: string;
  colors: string;
  times: string;
  interval: number;
}

export type VacancyMain = Omit<Vacancy, "recruter_id" | "created_at">;
export type VacancyWithCandidate = Pick<
  Vacancy,
  "id" | "colors" | "times" | "interval" | "title"
> & {
  candidate_id: string;
  color: string;
  firstname: string;
  lastname: string;
};
export type VacancyFormatted = Pick<
  Vacancy,
  "id" | "colors" | "times" | "interval" | "title"
> & {
  candidates: {
    id: string;
    color: string;
    firstname: string;
    lastname: string;
  }[];
};

export type ColorsParsed = Record<string, string>;
export type TimeParsed = Record<string, string>;
