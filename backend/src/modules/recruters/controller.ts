import type { Request, Response } from "express";
import { ValidSignupRecruter, ValidSigninRecruter } from "./model/valid.js";
import type { RecruterService } from "./service.js";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import {
  EMAIL_IS_USED_ERROR,
  JWT_SECRET,
  NODE_ENV,
  ONE_WEEK_IN_MILLISECONDS,
} from "../../shared/constants.js";
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
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: ONE_WEEK_IN_MILLISECONDS,
      });
      return res.json({ message: "Success created", id: userId });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(403).json({ error: "Invalid fields" });
      } else {
        if (error instanceof Error) {
          if (
            error.message.trim() === "UNIQUE constraint failed: recruters.email"
          ) {
            return res.status(404).json({ error: EMAIL_IS_USED_ERROR });
          }
        }
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
          secure: true,
          sameSite: "none",
          httpOnly: true,
          maxAge: ONE_WEEK_IN_MILLISECONDS,
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
