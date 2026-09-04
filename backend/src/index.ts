import express from "express";
import { PORT } from "./shared/constants.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routerRecruter } from "./modules/recruter/public.js";

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/recruter", routerRecruter);

app.listen(PORT, () => console.log(`https://localhost:${PORT}`));
