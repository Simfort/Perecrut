import { Router } from "express";
import { RecruterController } from "./controller.js";
import { RecruterService } from "./service.js";

export const router = Router();
const service = new RecruterService();
const controller = new RecruterController(service);

router.post("/signup", (req, res) => controller.signup(req, res));
router.post("/login", (req, res) => controller.signin(req, res));
router.get("/auth", (req, res) => controller.auth(req, res));
