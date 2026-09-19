import { Router } from "express";
import { CandidateController } from "./controller.js";
import { CandidateService } from "./service.js";

export const routerCandidates = Router({ mergeParams: true });
const service = new CandidateService();
const controller = new CandidateController(service);

routerCandidates.get("/:id", (req, res) => controller.getCandidate(req, res));
routerCandidates.post("/", (req, res) => controller.create(req, res));
