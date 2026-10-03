import { Recruters } from "../../modules/recruters/model/model.js";
import { Vacancies } from "../../modules/vacancies/model/model.js";
import { Candidates } from "../../modules/candidates/model/model.js";
import { connect } from "@tursodatabase/serverless";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "../constants.js";

const db = connect({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});
await db.exec(Recruters);
await db.exec(Vacancies);
await db.exec(Candidates);

export default db;
