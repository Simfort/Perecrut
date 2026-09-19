import { Router } from "express";
import { RecruterController } from "./controller.js";
import { RecruterService } from "./service.js";

export const routerRecruter = Router();
const service = new RecruterService();
const controller = new RecruterController(service);

routerRecruter.post("/signup", (req, res) => controller.signup(req, res));
routerRecruter.post("/login", (req, res) => controller.signin(req, res));
routerRecruter.get("/auth", (req, res) => controller.auth(req, res));
