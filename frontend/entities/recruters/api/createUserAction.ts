"use server";
import { ZodError } from "zod";
import { Recruter } from "../model/recruter";
import { ValidSignupRecruter } from "./schemas";
import { parseZodError, Paths } from "@/shared/utils/parseZodError";
import {
  BACKEND_URL,
  JWT_SECRET,
  SESSION_COOKIE_CONFIG,
} from "@/shared/constants";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type RecrutersFields = "firstname" | "lastname" | "email" | "password";
type RecruterMain = Pick<Recruter, RecrutersFields> & {
  confrimPassword: string;
};
export type CreateUserActionState = {
  success?: boolean;
  error?: Paths<RecrutersFields | "confrimPassword">;
  data: RecruterMain;
  globalError?: string;
};

const emailUsedError = "This email is used";

export const createUserAction = async (
  state: CreateUserActionState,
  fd: FormData,
): Promise<CreateUserActionState> => {
  const data: RecruterMain = {
    firstname: fd.get("firstname") as string,
    lastname: fd.get("lastname") as string,
    email: fd.get("email") as string,
    password: fd.get("password") as string,
    confrimPassword: fd.get("confrimPassword") as string,
  };
  try {
    const validData = ValidSignupRecruter.parse(data);
    if (validData.password !== validData.confrimPassword) {
      return {
        data,
        success: false,
        error: {
          confrimPassword: {
            message: "Not correct password",
            expected: "",
            code: "",
          },
        },
      };
    }
    const response = await fetch(`${BACKEND_URL}/recruters/signup`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validData),
      method: "POST",
      credentials: "include",
    });
    const responseData = await response.json();

    if (responseData?.error?.trim() === emailUsedError) {
      return {
        data,
        success: false,
        error: {
          email: {
            message: "Email is used",
            expected: "",
            code: "",
          },
        },
      };
    }
    switch (response.status) {
      case 403:
        return {
          data: validData,
          success: false,
          globalError: "Invalid fields",
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
    console.error(error);
    if (error instanceof ZodError) {
      const errors = parseZodError<RecrutersFields | "confrimPassword">(
        JSON.parse(error.message),
      );
      return { data, success: false, error: errors };
    }
    return { data, success: false, globalError: "Unknown error :/" };
  }
};
