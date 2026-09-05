import { RecruterMain } from "../../src/modules/recruter/model/types.ts";
import { RecruterService } from "../../src/modules/recruter/service.ts";
import jwt from "jsonwebtoken";
import { describe, expect, it } from "vitest";
import db from "../../src/shared/db/db.ts";
import { beforeEach } from "node:test";

describe("Testing recruter service", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test";
  });
  it("return valid id after create user", async () => {
    const service = new RecruterService();
    const data: RecruterMain = {
      firstname: "Test",
      lastname: "Test",
      password: "password",
      email: "ltestvalid@gmail.com",
    };
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
    const userId = await service.createUser(data);
    expect(userId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
  });
  it("return true if user login", async () => {
    const service = new RecruterService();
    const data: RecruterMain = {
      firstname: "Test",
      lastname: "Test",
      password: "password",
      email: "ltestvalid@gmail.com",
    };
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
    const userId = await service.createUser(data);
    expect(userId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    const isCompared = await service.loginUser(data);
    console.log(isCompared);
    expect(isCompared).toBeTruthy();
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
  });
  it("return false if password is not valid", async () => {
    const service = new RecruterService();
    const data: RecruterMain = {
      firstname: "Test",
      lastname: "Test",
      password: "password",
      email: "ltestvalid@gmail.com",
    };
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
    const userId = await service.createUser(data);
    expect(userId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    expect(await service.loginUser({ ...data, password: "12324" })).toBeFalsy();
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
  });
  it("return true if user created and autheficated", async () => {
    const service = new RecruterService();
    const data: RecruterMain = {
      firstname: "Test",
      lastname: "Test",
      password: "password",
      email: "ltestvalid@gmail.com",
    };
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
    const userId = await service.createUser(data);
    expect(userId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    const token = jwt.sign(
      { email: data.email },
      process.env.JWT_SECRET || "test",
    );
    const isAuth = await service.auth(token);
    expect(isAuth).toBeTruthy();
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
  });
  it("return false if user created but token is not valid autheficated", async () => {
    const service = new RecruterService();
    const data: RecruterMain = {
      firstname: "Test",
      lastname: "Test",
      password: "password",
      email: "ltestvalid@gmail.com",
    };
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
    const userId = await service.createUser(data);
    expect(userId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    const token = jwt.sign(
      { email: "test@gmail.email" },
      process.env.JWT_SECRET || "test",
    );
    const isAuth = await service.auth(token);
    expect(isAuth).toBeFalsy();
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
  });
});
