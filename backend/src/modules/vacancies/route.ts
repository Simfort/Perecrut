import { Router } from "express";
import { VacanciesController } from "./controller.js";
import { VacanciesService } from "./service.js";

export const routerVacancies = Router();
const service = new VacanciesService();
const controller = new VacanciesController(service);

routerVacancies.post("/", (req, res) => controller.createVacancy(req, res));
routerVacancies.get("/", (req, res) => controller.getAll(req, res));
routerVacancies.get("/:id", (req, res) => controller.getVacancy(req, res));
routerVacancies.delete("/:id", (req, res) => controller.delete(req, res));
routerVacancies.put("/:id", (req, res) => controller.updateVacancy(req, res));
