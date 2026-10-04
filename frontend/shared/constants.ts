import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { checkENV } from "./utils/checkENV";

export const BACKEND_URL = checkENV(
  "BACKEND URL IS UNDEFINED!",
  process.env.NEXT_PUBLIC_BACKEND_URL,
);
export const JWT_SECRET = checkENV(
  "JWT SECRET IS UNDEFINED",
  process.env.NEXT_PUBLIC_JWT_SECRET,
);
export const ONE_WEEK_IN_MILLISECONDS = 604800000;
export const SESSION_COOKIE_CONFIG = {
  sameSite: "lax",
  httpOnly: true,
  secure: process.env?.NODE_ENV === "production",
  maxAge: ONE_WEEK_IN_MILLISECONDS,
} as ResponseCookie;
