import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import db from "../../shared/db/db.js";
import type { RecruterJWT, RecruterMain } from "./model/types.js";
import { JWT_SECRET } from "../../shared/constants.js";

export class RecruterService {
  async createUser(data: Omit<RecruterMain, "id">) {
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
  async loginUser(data: Pick<RecruterMain, "password" | "email">) {
    const dataFinded = db
      .prepare(
        `--sql
      SELECT id,password FROM recruters
      WHERE email=?
      `,
      )
      .get(data.email) as Pick<RecruterMain, "password" | "id">;
    console.log(dataFinded, data.password);
    if (!dataFinded?.password) return false;
    const isCompared = await bcrypt.compare(data.password, dataFinded.password);
    return isCompared ? dataFinded.id : false;
  }
  async auth(token: string) {
    if (!token) return false;
    const data = jwt.verify(token, JWT_SECRET) as RecruterJWT;

    const authData = db
      .prepare(
        `--sql
      SELECT id,email FROM recruters 
      WHERE email=?`,
      )
      .get(data.email) as RecruterJWT;

    return authData;
  }
}
