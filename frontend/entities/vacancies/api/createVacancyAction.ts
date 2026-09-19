"use server";
import { ZodError } from "zod";

import { parseZodError, Paths } from "@/shared/utils/parseZodError";
import { BACKEND_URL } from "@/shared/constants";
import { Vacancy } from "../model/vacancy";
import { ValidCreateVacancy } from "./schemas";

import { cookies } from "next/headers";

type VacancyFields =
  | "organization"
  | "emp_type"
  | "title"
  | "description"
  | "salary_max"
  | "salary_min";
type VacancyMain = Pick<Vacancy, VacancyFields>;
export type CreateVacancyActionState = {
  success?: boolean;
  error?: Paths<VacancyFields | "confrimPassword">;
  data?: VacancyMain;
  globalError?: string;
};

export const createVacancyAction = async (
  state: CreateVacancyActionState,
  fd: FormData,
): Promise<CreateVacancyActionState> => {
  const data: VacancyMain = {
    title: fd.get("title") as string,
    description: fd.get("description") as string,
    organization: fd.get("organization") as string,
    salary_max: +(fd.get("salary_max") as string),
    salary_min: +(fd.get("salary_min") as string),
    emp_type: (fd.get("emp_type") as string) || "Full-time",
  };

  try {
    const sessionToken = (await cookies()).get("session-token")?.value;
    if (!sessionToken) return { success: false };
    const validData = ValidCreateVacancy.parse(data);
    const res = await fetch(`${BACKEND_URL}/vacancies/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
      method: "POST",
      body: JSON.stringify(validData),
    });
    if (!res.ok) {
      return { success: false, data: validData };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      const errors = parseZodError<VacancyFields | "confrimPassword">(
        JSON.parse(error.message),
      );
      return { data, success: false, error: errors };
    }
    return { data, success: false, globalError: "Unknown error :/" };
  }
};
