import { describe, expect, it } from "vitest";
import { CandidateService } from "../../src/modules/candidates/service";
import { ValidDataCandidateForCreate } from "../../src/modules/candidates/model/valid";
import { RecruterService } from "../../src/modules/recruters/service";
import { RecruterMain } from "../../src/modules/recruters/model/types";
import db from "../../src/shared/db/db";
import { VacanciesService } from "../../src/modules/vacancies/service";
import { VacancyMain } from "../../src/modules/vacancies/model/types";

describe("Testing candidates service", () => {
  it("Success create candidate", async () => {
    const recrutersService = new RecruterService();
    const vacanciesService = new VacanciesService();
    const candidatesService = new CandidateService();
    const recruter = {
      firstname: "Test",
      lastname: "Test",
      password: "password",
      email: "ltest2asdvalid@gmail.com",
    } as RecruterMain;
    const candidate = {
      firstname: "Test",
      lastname: "Test",
      description: "S",
      color: "red",
    } as ValidDataCandidateForCreate;
    const vacancy = {
      title: "Test",
      description: "Is Testing",
      emp_type: "Full-time",
      salary_min: 1000,
      salary_max: 10000,
      organization: "OOO 'RAI'",
      times: "{}",
      interval: 30,
    } as VacancyMain;
    const recruter_id = await recrutersService.createUser(recruter);
    expect(recruter_id).toBeDefined();
    const vacancy_id = vacanciesService.create(vacancy, recruter_id);
    expect(vacancy_id).toBeDefined();
    const candidate_id = candidatesService.create(candidate, vacancy_id);
    expect(candidate_id).toBeDefined();
    db.prepare("DELETE FROM recruters WHERE email=?").run(recruter.email);
  });
});
