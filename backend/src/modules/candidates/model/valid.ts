import z from "zod";
import type { Candidate } from "./types.js";

export type ValidDataCandidateForCreate = Pick<
  Candidate,
  "color" | "description" | "firstname" | "lastname"
>;

export const ValidCreateCandidate = z.object({
  firstname: z.string(),
  lastname: z.string(),
  description: z.string(),
  color: z.string(),
});
