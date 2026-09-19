import z from "zod";

const EMP_TYPES = ["Full-time", "Part-time", "Contract"];

export const ValidCreateVacancy = z
  .object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    organization: z.string().nonempty(),
    emp_type: z.enum(EMP_TYPES),
    salary_min: z.int(),
    salary_max: z.int(),
  })
  .refine(
    (data) => {
      return data.salary_min <= data.salary_max;
    },
    {
      path: ["salary_max"],
      message: "Salary max is not be smaller salary min",
    },
  );
export const ValidUpdateVacancy = z.object({
  id: z.string(),
  colors: z.string(),
  times: z.string(),
  interval: z.number(),
});

//  CREATE TABLE IF NOT EXISTS vacancies(
//         id TEXT NOT NULL PRIMARY KEY,
//         title TEXT NOT NULL,
//         description TEXT NOT NULL,
//         recruter_id TEXT NOT NULL,
//         emp_type TEXT NOT NULL,
//         salary_min INTEGER NOT NULL,
//         salary_max INTEGER NOT NULL,
//         organization TEXT NOT NULL,
//         created_at TEXT NOT NULL   DEFAULT(datetime('now')),
//         FOREIGN KEY (recruter_id) REFERENCES recruters(id)
//         ON DELETE CASCADE
//     )
