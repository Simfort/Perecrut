import z from "zod";

export const ValidCreateCandidate = z.object({
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  color: z.string().nonempty(),
  description: z.string().nonempty(),
});
