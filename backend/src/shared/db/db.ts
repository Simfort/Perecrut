import Database from "better-sqlite3";
import { Recruter } from "../../modules/recruter/model/model.js";
import { Vacancies } from "../../modules/vacancies/model/model.js";

const db = new Database("perecrut.db");

db.exec(Recruter);
db.exec(Vacancies);

export default db;
