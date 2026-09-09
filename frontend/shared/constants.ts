import { checkENV } from "./utils/checkENV";

export const BACKEND_URL = checkENV(
  "BACKEND URL IS UNDEFINED!",
  process.env.NEXT_PUBLIC_BACKEND_URL,
);
