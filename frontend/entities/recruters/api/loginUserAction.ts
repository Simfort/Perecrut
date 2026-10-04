"use server";
import { ZodError } from "zod";
import { Recruter } from "../model/recruter";
import { ValidSigninRecruter } from "./schemas";
import { parseZodError, Paths } from "@/shared/utils/parseZodError";
import { BACKEND_URL, SESSION_COOKIE_CONFIG } from "@/shared/constants";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/shared/server-constants";

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

  try {
    const validData = ValidSigninRecruter.parse(data);

    const response = await fetch(`${BACKEND_URL}/recruters/login`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validData),
      method: "POST",
    });
    const responseData = await response.json();

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
    const cookieStore = await cookies();
    const jwtToken = jwt.sign(
      { email: validData.email, id: responseData.id },
      JWT_SECRET,
    );
    cookieStore.set("session-token", jwtToken, SESSION_COOKIE_CONFIG);
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
