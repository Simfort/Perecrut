import { randomBytes } from "node:crypto";
import db from "../../shared/db/db.js";
import type {
  VacancyFormatted,
  VacancyMain,
  VacancyToGetAll,
  VacancyToGetAllFormatted,
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
  getVacancy(id: string) {
    const result = db
      .prepare(
        `--sql
      SELECT v.created_at,v.description,v.id,v.times,v.colors,v.interval,v.title,c.firstname,c.lastname,c.color,c.id as candidate_id
      FROM vacancies as v
     LEFT JOIN  candidates as c
      ON v.id = c.vacancy_id
      WHERE v.id = ? 
  
      `,
      )
      .all(id) as VacancyWithCandidate[];
    const vacancy = {
      id: result[0].id,
      interval: result[0].interval,
      times: result[0].times,
      colors: result[0].colors,
      candidates: [],
      title: result[0].title,
      description: result[0].description,
      created_at: result[0].created_at,
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
    const result = db
      .prepare(
        `--sql
      SELECT v.description,
      v.created_at,
      v.id,
      v.title,
      v.emp_type,
      c.firstname,
      c.lastname,
      v.organization,
      v.salary_min,
      c.description as candidate_description,
      v.salary_max ,
      c.vacancy_id
      FROM vacancies as v
      LEFT JOIN  candidates as c
      ON v.id = c.vacancy_id
      WHERE v.recruter_id = ? 
      `,
      )
      .all(recruter_id) as VacancyToGetAll[];
    console.log(result);
    const vacancies: VacancyToGetAllFormatted[] = [];
    for (const vacancy of result) {
      const vacancyFormatted = {
        id: vacancy.id,
        title: vacancy.title,
        description: vacancy.description,
        emp_type: vacancy.emp_type,
        salary_min: vacancy.salary_min,
        salary_max: vacancy.salary_max,
        organization: vacancy.organization,
        created_at: vacancy.created_at,
        candidates: [],
      } as VacancyToGetAllFormatted;
      for (const item of result) {
        if (item.vacancy_id === vacancyFormatted.id) {
          vacancyFormatted.candidates.push({
            firstname: item.firstname,
            description: item.candidate_description,
            lastname: item.lastname,
          });
        }
      }
      vacancies.push(vacancyFormatted);
    }
    return vacancies;
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
