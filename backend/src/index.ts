import express from "express";
import { PORT } from "./shared/constants.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routerRecruter } from "./modules/recruter/route.js";
import { routerVacancies } from "./modules/vacancies/route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/recruters", routerRecruter);
app.use("/vacancies", routerVacancies);

app.listen(PORT, () => console.log(`https://localhost:${PORT}`));
