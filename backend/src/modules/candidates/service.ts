import { randomBytes } from "node:crypto";
import db from "../../shared/db/db.js";
import type { ValidDataCandidateForCreate } from "./model/valid.js";
import type { Candidate } from "./model/types.js";

export class CandidateService {
  async create(data: ValidDataCandidateForCreate, vacancyId: string) {
    const candidateId = randomBytes(8).toString("base64url");
    await db.run(
      `--sql
        INSERT INTO candidates (id,firstname,lastname,description,color,vacancy_id)
        VALUES (?,?,?,?,?,?)
        `,
      candidateId,
      data.firstname,
      data.lastname,
      data.description,
      data.color,
      vacancyId,
    );
    return candidateId;
  }
  async getCandidate(id: string) {
    return (await db.get(
      `--sql
        SELECT * FROM candidates
        WHERE id = ?
        `,
      id,
    )) as Candidate;
  }
}
