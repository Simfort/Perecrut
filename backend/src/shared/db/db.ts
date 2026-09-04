import Database from "better-sqlite3";
import { Recruter } from "../../modules/recruter/model/model.js";

const db = new Database("perecrut.db");

db.exec(Recruter);

export default db;
