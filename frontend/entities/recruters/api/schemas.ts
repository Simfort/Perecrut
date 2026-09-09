import z from "zod";
const errorEmpty = "Some field is empty";

export const ValidSignupRecruter = z.object({
  firstname: z.string({ error: errorEmpty }).nonempty(),
  lastname: z.string({ error: errorEmpty }).nonempty(),
  email: z.email({ error: "Email is invalid" }).nonempty(),
  password: z
    .string({ error: errorEmpty })
    .min(6, {
      error: (iss) => {
        return `Password must have ${iss.minimum} characters or more`;
      },
    })
    .max(40, {
      error: (iss) => {
        return `Password must have ${iss.maximum} characters or more`;
      },
    })
    .nonempty(),
  confrimPassword: z.string({ error: errorEmpty }).nonempty(),
});
export const ValidSigninRecruter = z.object({
  email: z.email({ error: "Email is invalid" }).nonempty(),
  password: z
    .string({ error: errorEmpty })
    .min(6, {
      error: (iss) => {
        return `Password must have ${iss.minimum} characters or more`;
      },
    })
    .max(40, {
      error: (iss) => {
        return `Password must have ${iss.maximum} characters or more`;
      },
    })
    .nonempty(),
});
