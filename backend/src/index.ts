import express from "express";
import { CLIENT_URL, PORT } from "./shared/constants.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routerRecruter } from "./modules/recruters/route.js";
import { routerVacancies } from "./modules/vacancies/route.js";
import { routerCandidates } from "./modules/candidates/route.js";

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/recruters", routerRecruter);
app.use("/api/vacancies", routerVacancies);
app.use("/api/candidates/:vacancyId", routerCandidates);

app.listen(PORT, () => console.log(`https://localhost:${PORT}`));
