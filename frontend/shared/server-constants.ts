import { checkENV } from "./utils/checkENV";

export const JWT_SECRET = checkENV(
  "JWT SECRET IS UNDEFINED",
  process.env.JWT_SECRET,
);
