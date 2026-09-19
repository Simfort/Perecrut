"server-only";

import { BACKEND_URL } from "@/shared/constants";
import { Vacancy } from "../model/vacancy";

export const getAll = async (token: string) => {
  const res = await fetch(`${BACKEND_URL}/vacancies/`, {
    credentials: "include",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    console.log(await res.json());
    return false;
  }
  const data: { data: Vacancy[] } = await res.json();
  return data.data;
};
