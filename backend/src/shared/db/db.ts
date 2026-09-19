import Database from "better-sqlite3";
import { Recruters } from "../../modules/recruters/model/model.js";
import { Vacancies } from "../../modules/vacancies/model/model.js";
import { Candidates } from "../../modules/candidates/model/model.js";

const db = new Database("perecrut.db");

db.exec(Recruters);
db.exec(Vacancies);
db.exec(Candidates);

export default db;
