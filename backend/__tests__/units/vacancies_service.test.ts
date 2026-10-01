import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { VacanciesService } from "../../src/modules/vacancies/service";
import { RecruterService } from "../../src/modules/recruters/service";
import { VacancyMain } from "../../src/modules/vacancies/model/types";

import { RecruterMain } from "../../src/modules/recruters/model/types";
import db from "../../src/shared/db/db";

describe("Testing vacancies service", () => {
  let recruter_id: string | null = null;
  const data = {
    firstname: "Test",
    lastname: "Test",
    password: "password",
    email: "ltest2valid@gmail.com",
  } as RecruterMain;
  beforeEach(async () => {
    const recruterService = new RecruterService();
    recruter_id = await recruterService.createUser(data);
    console.log("penis", recruter_id);
    expect(recruter_id).toBeTruthy();
  });
  afterEach(async () => {
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
  });
  it("Success created vacancy", async () => {
    expect(recruter_id).not.toBeNull();
    const vacanciesService = new VacanciesService();
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
    const vacancy_id = vacanciesService.create(vacancy, recruter_id!);
    expect(typeof vacancy_id).toBe("string");
    db.prepare("DELETE FROM vacancies WHERE id = ?").run(vacancy_id);
    const vacancyFindedId = db
      .prepare("SELECT id FROM vacancies WHERE id = ?")
      .get(vacancy_id);
    expect(vacancyFindedId).toBeUndefined();
  });
  it("Success get vacancy", async () => {
    expect(recruter_id).not.toBeNull();
    const vacanciesService = new VacanciesService();

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
    const vacancy_id = vacanciesService.create(vacancy, recruter_id!);
    expect(typeof vacancy_id).toBe("string");
    const vacancyFinded = vacanciesService.getVacancy(vacancy_id);
    expect(vacancyFinded).toBeTruthy();
    vacanciesService.delete(vacancy_id);
    const vacancyFindedId = db
      .prepare("SELECT id FROM vacancies WHERE id = ?")
      .get(vacancy_id);
    expect(vacancyFindedId).toBeUndefined();
  });
  it("Success get all vacancy", async () => {
    expect(recruter_id).not.toBeNull();
    const vacanciesService = new VacanciesService();

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
    const vacancy_id = vacanciesService.create(vacancy, recruter_id!);
    expect(typeof vacancy_id).toBe("string");
    const vacancyFinded = vacanciesService.getAll(recruter_id!);
    expect(vacancyFinded).toBeTruthy();
    vacanciesService.delete(vacancy_id);
    const vacancyFindedId = db
      .prepare("SELECT id FROM vacancies WHERE id = ?")
      .get(vacancy_id);
    expect(vacancyFindedId).toBeUndefined();
  });
  it("Success get all vacancy", async () => {
    expect(recruter_id).not.toBeNull();
    const vacanciesService = new VacanciesService();

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
    const vacancy_id = vacanciesService.create(vacancy, recruter_id!);
    expect(typeof vacancy_id).toBe("string");
    const vacancyFinded = vacanciesService.getAll(recruter_id!);
    expect(vacancyFinded).toBeTruthy();
    vacanciesService.delete(vacancy_id);
    const vacancyFindedId = db
      .prepare("SELECT id FROM vacancies WHERE id = ?")
      .get(vacancy_id);
    expect(vacancyFindedId).toBeUndefined();
  });
});
