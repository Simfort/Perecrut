import { randomBytes } from "node:crypto";
import db from "../../shared/db/db.js";
import type {
  Vacancy,
  VacancyFormatted,
  VacancyMain,
  VacancyWithCandidate,
} from "./model/types.js";

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
    const result = db
      .prepare(
        `--sql
      SELECT v.id,v.times,v.colors,v.interval,v.title,c.firstname,c.lastname,c.color,c.id as candidate_id
      FROM vacancies as v
      JOIN  candidates as c
      ON v.id = c.vacancy_id
      WHERE v.id = ? AND v.recruter_id = ?
  
      `,
      )
      .all(id, recruter_id) as VacancyWithCandidate[];
    const vacancy = {
      id: result[0].id,
      interval: result[0].interval,
      times: result[0].times,
      colors: result[0].colors,
      candidates: [],
    } as VacancyFormatted;
    for (const item of result) {
      const candidate = {
        id: item.candidate_id,
        color: item.color,
        firstname: item.firstname,
        lastname: item.lastname,
      };
      vacancy!.candidates!.push(candidate);
    }
    return vacancy;
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
