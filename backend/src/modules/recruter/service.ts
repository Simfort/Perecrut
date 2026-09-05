import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import db from "../../shared/db/db.js";
import type { RecruterJWT, RecruterMain } from "./model/types.js";
import { JWT_SECRET } from "../../shared/constants.js";

export class RecruterService {
  async createUser(data: RecruterMain) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    const userId = randomUUID();
    db.prepare(
      `--sql
      INSERT INTO recruters (id,firstname,lastname,password,email)
      VALUES(?,?,?,?,?)
      `,
    ).run(userId, data.firstname, data.lastname, hashPassword, data.email);
    return userId;
  }
  async loginUser(data: RecruterJWT & Pick<RecruterMain, "password">) {
    const dataFinded = db
      .prepare(
        `--sql
      SELECT password FROM recruters
      WHERE email=?
      `,
      )
      .get(data.email) as Pick<RecruterMain, "password">;
    console.log(dataFinded, data.password);
    if (!dataFinded?.password) return false;
    const isCompared = await bcrypt.compare(data.password, dataFinded.password);
    return isCompared;
  }
  async auth(token: string) {
    const data = jwt.verify(token, JWT_SECRET) as RecruterJWT;

    const hashPassword = db
      .prepare(
        `--sql
      SELECT id FROM recruters 
      WHERE email=?`,
      )
      .get(data.email) as string;

    return !!hashPassword;
  }
}
