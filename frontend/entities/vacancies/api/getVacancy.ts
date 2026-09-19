"server-only";

import { BACKEND_URL } from "@/shared/constants";
import { Vacancy } from "../model/vacancy";

export const getVacancy = async (token: string, vacancyId: string) => {
  const res = await fetch(`${BACKEND_URL}/vacancies/${vacancyId}`, {
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    console.log(await res.json());
    return false;
  }
  const data: { data: Vacancy } = await res.json();
  return data.data;
};
