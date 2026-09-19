import type { Request, Response } from "express";
import type { CandidateService } from "./service.js";
import { ValidCreateCandidate } from "./model/valid.js";
import { ZodError } from "zod";

export class CandidateController {
  #service: CandidateService | null = null;
  constructor(service: CandidateService) {
    this.#service = service;
    if (!this.#service) {
      throw new Error("Service not initialized");
    }
  }
  create(req: Request, res: Response) {
    try {
      const body = req.body;
      const vacancyId = req.params.vacancyId as string;
      const validData = ValidCreateCandidate.parse(body);
      const candidateId = this.#service?.create(validData, vacancyId);
      return res
        .status(201)
        .json({ message: "Candidate success created!", data: candidateId });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(404).json({ message: "Error fields" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  getCandidate(req: Request, res: Response) {
    try {
      const candidateId = req.params.id as string;
      const candidate = this.#service?.getCandidate(candidateId);
      if (candidate)
        return res
          .status(200)
          .json({ message: "Success getted", data: candidate });
      return res.status(404).json({ message: "Not found" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
