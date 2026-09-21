import { ZodError } from "zod";

import { parseZodError, Paths } from "@/shared/utils/parseZodError";
import { BACKEND_URL } from "@/shared/constants";
import { Candidate } from "../model/candidate";
import { ValidCreateCandidate } from "./schemas";

type CandidatesFields = "firstname" | "lastname" | "description" | "color";
type CandidateMain = Pick<Candidate, CandidatesFields>;

export type CreateCandidateActionState = {
  success?: boolean;
  error?: Paths<CandidatesFields>;
  data: CandidateMain;
  vacancy_id: string;
  globalError?: string;
};

export const createCandidateAction = async (
  state: CreateCandidateActionState,
  fd: FormData,
): Promise<CreateCandidateActionState> => {
  const data: CandidateMain = {
    firstname: (fd.get("firstname") as string) ?? "",
    lastname: (fd.get("lastname") as string) ?? "",
    color: (fd.get("color") as string) ?? "black",
    description: (fd.get("description") as string) ?? "",
  };

  if (!state.vacancy_id) {
    return {
      data,
      vacancy_id: state.vacancy_id || "",
      success: false,
      globalError: "Vacancy id is undefined",
    };
  }

  try {
    const validData = ValidCreateCandidate.parse(data);

    const res = await fetch(`${BACKEND_URL}/candidates/${state.vacancy_id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validData),
    });

    const response_data = await res.json();
    console.log(response_data);
    localStorage.setItem("color", validData.color);
    return {
      data,
      success: true,
      vacancy_id: state.vacancy_id,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      const errors = parseZodError<CandidatesFields>(JSON.parse(error.message));
      return {
        data,
        success: false,
        error: errors,
        vacancy_id: state.vacancy_id,
      };
    }

    return {
      data,
      success: false,
      globalError: "Unknown error :/",
      vacancy_id: state.vacancy_id,
    };
  }
};
