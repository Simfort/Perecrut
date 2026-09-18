"use client";
import { type Vacancy as IVacancy } from "@/entities/vacancies";
import { ChevronDown, ChevronUp } from "lucide-react";
import { use, useState } from "react";
import { Calendar } from "./Calendar";

interface VacancyProps {
  promise: Promise<IVacancy | false>;
}

export const Vacancy = ({ promise }: VacancyProps) => {
  const vacancy = use(promise);
  const [openFlag, setOpenFlag] = useState(false);
  if (!vacancy) return null;
  return (
    <div>
      <h2>{vacancy.title}</h2>
      <p>{vacancy.description}</p>
      <button onClick={() => setOpenFlag(!openFlag)} className="but-prim">
        Open Calendar {openFlag ? <ChevronDown /> : <ChevronUp />}
      </button>
      {openFlag && <Calendar />}
    </div>
  );
};
