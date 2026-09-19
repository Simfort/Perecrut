import type { Request, Response } from "express";
import { ValidSignupRecruter, ValidSigninRecruter } from "./model/valid.js";
import type { RecruterService } from "./service.js";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "../../shared/constants.js";
import { error } from "node:console";

export class RecruterController {
  #service: RecruterService | null = null;
  constructor(service: RecruterService) {
    this.#service = service;
    if (!this.#service) {
      throw new Error("Service not initialized");
    }
  }
  async signup(req: Request, res: Response) {
    try {
      const data = req.body;
      const successData = ValidSignupRecruter.parse(data);

      const userId = await this.#service?.createUser(successData);
      const jwtToken = jwt.sign(
        {
          email: successData.email,
          id: userId,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.cookie("session-token", jwtToken, {
        sameSite: "lax",
        secure: NODE_ENV === "production",
        httpOnly: true,
        maxAge: 7000000,
      });
      return res.json({ message: "Success created", id: userId });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(403).json({ error: "Invalid fields" });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
  async signin(req: Request, res: Response) {
    try {
      const data = req.body;
      const successData = ValidSigninRecruter.parse(data);
      const loginedData = await this.#service?.loginUser(successData);
      if (loginedData) {
        const jwtToken = jwt.sign(
          { id: loginedData, email: successData.email },
          JWT_SECRET,
          { expiresIn: "7d" },
        );
        res.cookie("session-token", jwtToken, {
          sameSite: "lax",
          secure: NODE_ENV === "production",
          httpOnly: true,
          maxAge: 7000000,
        });
        return res.json({ message: "Success login" });
      }
      return res.status(403).json({ error: "Error credentials" });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(403).json({ error: "Invalid fields" });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
  async auth(req: Request, res: Response) {
    try {
      const sessionToken =
        req.cookies["session-token"] || req.headers.authorization;

      const auth = await this.#service?.auth(sessionToken);
      if (auth) {
        return res.status(200).json({ message: "Success auth", data: auth });
      }
      return res.status(404).json({ error: "Not found" });
    } catch {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
