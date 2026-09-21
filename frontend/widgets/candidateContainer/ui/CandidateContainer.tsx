"use client";

import { useVacancy, VacancyFormatted } from "@/entities/vacancies";

import { CalendarCandidate } from "@/features/calendarCandidate";
import { CandidateCreatorForm } from "@/features/createCandidate";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface CalendarContainerProps {
  vacancyData: VacancyFormatted;
}

export const CandidateContainer = ({ vacancyData }: CalendarContainerProps) => {
  const search = useSearchParams();
  const step = Number(search.get("step")) || 0;
  const { setVacancy, vacancy } = useVacancy();
  useEffect(() => {
    if (vacancyData) {
      const times = JSON.parse(vacancyData!.times);
      const colors = JSON.parse(vacancyData!.colors);
      setVacancy({ ...vacancyData, colors, times: times });
    }
  }, [vacancyData]);
  if (!vacancy) return null;
  const CurrentComponent =
    step === 0 ? <CandidateCreatorForm /> : <CalendarCandidate />;
  return <div>{CurrentComponent}</div>;
};
