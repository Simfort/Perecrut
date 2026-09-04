import { RecruterMain } from "../../src/modules/recruter/model/types.ts";
import { RecruterService } from "../../src/modules/recruter/service.ts";

import { describe, expect, it } from "vitest";
import db from "../../src/shared/db/db.ts";

describe("Testing recruter service", () => {
  it("create user and return id", () => {
    const service = new RecruterService();
    const data: RecruterMain = {
      firstname: "David",
      lastname: "Lemondzava",
      password: "Redball@13",
      email: "lemond2zavadavid265@gmail.com",
    };
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
    expect(service.createUser(data)).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    );
    db.prepare("DELETE FROM recruters WHERE email=?").run(data.email);
  });
});
