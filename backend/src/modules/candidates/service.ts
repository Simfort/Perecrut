import { randomBytes } from "node:crypto";
import db from "../../shared/db/db.js";
import type { ValidDataCandidateForCreate } from "./model/valid.js";
import type { Candidate } from "./model/types.js";

export class CandidateService {
  create(data: ValidDataCandidateForCreate, vacancyId: string) {
    const candidateId = randomBytes(8).toString("base64url");
    db.prepare(
      `--sql
        INSERT INTO candidates (id,firstname,lastname,description,color,vacancy_id)
        VALUES (?,?,?,?,?,?)
        `,
    ).run(
      candidateId,
      data.firstname,
      data.lastname,
      data.description,
      data.color,
      vacancyId,
    );
    return candidateId;
  }
  getCandidate(id: string) {
    return db
      .prepare(
        `--sql
        SELECT * FROM candidates
        WHERE id = ?
        `,
      )
      .get(id) as Candidate;
  }
}
