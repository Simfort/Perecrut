import type { Request, Response } from "express";
import type { VacanciesService } from "./service.js";
import { RecruterService } from "../recruters/service.js";
import { ValidCreateVacancy, ValidUpdateVacancy } from "./model/valid.js";
import { ZodError } from "zod";
import { getIntervalsHours } from "../../shared/utils/getInterevalsHours.js";
import type { VacancyMain } from "./model/types.js";

export class VacanciesController {
  #service: VacanciesService | null = null;
  constructor(service: VacanciesService) {
    this.#service = service;
    if (!this.#service) {
      throw new Error("Service not initialized");
    }
  }
  async createVacancy(req: Request, res: Response) {
    try {
      const data = req.body;

      const sessionToken =
        req.cookies["session-token"] || req.headers.authorization;
      const recrutersService = new RecruterService();
      const authorized = await recrutersService.auth(sessionToken);
      if (authorized) {
        const times = JSON.stringify(
          getIntervalsHours(30).map((time) => ({ [time]: null })),
        );
        const validData = {
          ...ValidCreateVacancy.parse(data),
          times,
          interval: 30,
        };
        const vacancyId = this.#service?.create(validData, authorized.id);

        return res
          .status(200)
          .json({ message: "Vacancy success created!", data: vacancyId });
      }
      return res.status(404).json({ message: "Not found" });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(403).json({ message: "Invalid fields" });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  async getVacancy(req: Request, res: Response) {
    try {
      const vacancyId = req.params.id as string;
      console.log(vacancyId);
      const sessionToken =
        req.cookies["session-token"] || req.headers.authorization;
      const recrutersService = new RecruterService();
      const authorized = await recrutersService.auth(sessionToken);
      if (authorized) {
        const vacancy = this.#service?.getVacancy(vacancyId, authorized.id);

        return res
          .status(200)
          .json({ message: "Vacancy success getted!", data: vacancy });
      }
      return res.status(404).json({ message: "Not found" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const sessionToken =
        req.cookies["session-token"] || req.headers.authorization;
      const recrutersService = new RecruterService();
      const authorized = await recrutersService.auth(sessionToken);
      console.log(sessionToken);
      if (authorized) {
        const vacancies = this.#service?.getAll(authorized.id);

        return res
          .status(200)
          .json({ message: "Vacancies success getted!", data: vacancies });
      }
      return res.status(404).json({ message: "Not found" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const vacancyId = req.params.id as string;
      const sessionToken =
        req.cookies["session-token"] || req.headers.authorization;
      const recrutersService = new RecruterService();
      const authorized = await recrutersService.auth(sessionToken);
      if (authorized) {
        this.#service?.delete(vacancyId);
        return res
          .status(200)
          .json({ message: "Vacancies success getted!", data: vacancyId });
      }
      return res.status(404).json({ message: "Not found" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async updateVacancy(req: Request, res: Response) {
    try {
      const data = req.body;

      const sessionToken =
        req.cookies["session-token"] || req.headers.authorization;
      const recrutersService = new RecruterService();
      const authorized = await recrutersService.auth(sessionToken);
      if (authorized) {
        const validData = ValidUpdateVacancy.parse(data) as VacancyMain;
        const vacancyId = this.#service?.update(validData);

        return res
          .status(200)
          .json({ message: "Vacancy success updated!", data: vacancyId });
      }
      return res.status(404).json({ message: "Not found" });
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(403).json({ message: "Invalid fields" });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
