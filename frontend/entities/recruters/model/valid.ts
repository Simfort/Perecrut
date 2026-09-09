// export const ValidSigninRecruter = z.object({
//   email: z.email({ error: "Email is invalid" }),
//   password: z
//     .string({ error: errorEmpty })
//     .min(6, {
//       error: (iss) => {
//         return `Password must have ${iss.minimum} characters or more`;
//       },
//     })
//     .max(40, {
//       error: (iss) => {
//         return `Password must have ${iss.maximum} characters or more`;
//       },
//     }),
// });
