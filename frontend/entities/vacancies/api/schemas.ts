import { EMP_TYPES } from "@/entities/recruters";
import z from "zod";

export const ValidCreateVacancy = z
  .object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    organization: z.string().nonempty(),
    emp_type: z.enum(EMP_TYPES),
    salary_min: z.number(),
    salary_max: z.int(),
  })
  .refine(
    (data) => {
      return data.salary_min <= data.salary_max;
    },
    {
      path: ["salary_max", "salary_min"],
      message: "Salary max is not be smaller salary min",
    },
  );
