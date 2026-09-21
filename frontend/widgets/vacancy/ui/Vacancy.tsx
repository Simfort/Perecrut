"use client";
import { type Vacancy as IVacancy } from "@/entities/vacancies";
import { ChevronDown, ChevronUp } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";

interface VacancyProps {
  promise: Promise<IVacancy | false>;
}

export const Vacancy = ({ promise }: VacancyProps) => {
  const vacancyData = use(promise);
  const { setVacancy } = useVacancy();
  const [openFlag, setOpenFlag] = useState(false);
  useEffect(() => {
    if (vacancyData) {
      const times = JSON.parse(vacancyData.times);
      const colors = JSON.parse(vacancyData.colors);

      setVacancy({ ...vacancyData, times, colors });
    }
  }, [vacancyData]);

  if (!vacancyData) return null;

  return (
    <div>
      <h2>{vacancyData.title}</h2>
      <p>{vacancyData.description}</p>
      <button onClick={() => setOpenFlag(!openFlag)} className="but-prim">
        Open Calendar {openFlag ? <ChevronDown /> : <ChevronUp />}
      </button>
      {openFlag && <Calendar />}
    </div>
  );
};
