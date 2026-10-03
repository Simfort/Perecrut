import { config } from "dotenv";
import { checkENV } from "./utils/checkENV.js";
config();

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = checkENV(
  "JWT_SECRET IS UNDEFINED",
  process.env.JWT_SECRET,
);
export const TURSO_DATABASE_URL = checkENV(
  "TURSO_DATABASE_URL IS UNDEFINED",
  process.env.TURSO_DATABASE_URL,
);
export const TURSO_AUTH_TOKEN = checkENV(
  "TURSO_AUTH_TOKEN IS UNDEFINED",
  process.env.TURSO_AUTH_TOKEN,
);
export const CLIENT_URL = checkENV(
  "CLIENT_URL IS UNDEFINED",
  process.env.CLIENT_URL,
);

export const NODE_ENV = process.env.NODE_ENV;
export const EMAIL_IS_USED_ERROR = "This email is used";

export const ONE_WEEK_IN_MILLISECONDS = 604800000;
