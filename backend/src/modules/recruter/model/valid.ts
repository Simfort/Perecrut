import z from "zod";

const errorEmpty = "Some field is empty";

export const ValidSignupRecruter = z.object({
  firstname: z.string({ error: errorEmpty }),
  lastname: z.string({ error: errorEmpty }),
  email: z.email({ error: "Email is invalid" }),
  description: z.string({ error: errorEmpty }).optional(),
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
    }),
});
export const ValidSigninRecruter = z.object({
  email: z.email({ error: "Email is invalid" }),
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
    }),
});
