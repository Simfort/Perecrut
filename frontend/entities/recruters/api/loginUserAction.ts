import { ZodError } from "zod";
import { Recruter } from "../model/recruter";
import { ValidSigninRecruter } from "./schemas";
import { parseZodError, Paths } from "@/shared/utils/parseZodError";
import { BACKEND_URL } from "@/shared/constants";

type RecrutersFields = "email" | "password";
type RecruterMain = Pick<Recruter, RecrutersFields>;
export type LoginUserActionState = {
  success?: boolean;
  error?: Paths<RecrutersFields | "confrimPassword">;
  data: RecruterMain;
  globalError?: string;
};

export const loginUserAction = async (
  state: LoginUserActionState,
  fd: FormData,
): Promise<LoginUserActionState> => {
  const data: RecruterMain = {
    email: fd.get("email") as string,
    password: fd.get("password") as string,
  };
  console.log(data);
  try {
    const validData = ValidSigninRecruter.parse(data);

    const response = await fetch(`${BACKEND_URL}/recruters/login`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validData),
      method: "POST",

      credentials: "include",
    });
    const responseData = await response.json();
    console.log(responseData);

    switch (response.status) {
      case 403:
        return {
          data: validData,
          success: false,
          globalError: responseData.error,
        };
      case 500:
        return {
          data: validData,
          success: false,
          globalError: "Unknown error :/",
        };
    }

    return { data: validData, success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = parseZodError<RecrutersFields | "confrimPassword">(
        JSON.parse(error.message),
      );
      return { data, success: false, error: errors };
    }
    return { data, success: false, globalError: "Unknown error :/" };
  }
};
