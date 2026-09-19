import { randomBytes } from "node:crypto";
import db from "../../shared/db/db.js";
import type { Vacancy, VacancyMain } from "./model/types.js";

export class VacanciesService {
  create(data: VacancyMain, recruter_id: string) {
    const vacancyId = randomBytes(8).toString("base64url");
    db.prepare(
      `--sql
        INSERT INTO vacancies (id,title,description,organization,salary_max,salary_min,emp_type,recruter_id,times)
        VALUES (?,?,?,?,?,?,?,?,?)
        `,
    ).run(
      vacancyId,
      data.title,
      data.description,
      data.organization,
      data.salary_max,
      data.salary_min,
      data.emp_type,
      recruter_id,
      data.times,
    );
    return vacancyId;
  }
  update(data: VacancyMain) {
    db.prepare(
      `--sql
      UPDATE vacancies
      SET colors = ? , times = ?, interval=?
      WHERE id = ?
      `,
    ).run(data.colors, data.times, data.interval, data.id);

    return data.id;
  }
  getVacancy(id: string, recruter_id: string) {
    return db
      .prepare(
        `--sql
      SELECT * FROM vacancies
      WHERE id = ? AND recruter_id = ?
      `,
      )
      .get(id, recruter_id) as Vacancy;
  }
  getAll(recruter_id: string) {
    return db
      .prepare(
        `--sql
        SELECT * FROM vacancies
        WHERE recruter_id = ?
      `,
      )
      .all(recruter_id) as Vacancy[];
  }

  delete(id: string) {
    db.prepare(
      `--sql
        DELETE FROM vacancies
        WHERE id = ?
      `,
    ).run(id);
    return id;
  }
}
