import { BACKEND_URL } from "@/shared/constants";
import { VacancyFormatted } from "@/widgets/vacancy/lib/store/useVacancy";

export const updateVacancyAction = async (vacancy: VacancyFormatted) => {
  try {
    const timesJSON = JSON.stringify(vacancy.times);
    const colorsJSON = JSON.stringify(vacancy.colors);
    const res = await fetch(`${BACKEND_URL}/vacancies/${vacancy.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...vacancy,
        times: timesJSON,
        colors: colorsJSON,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};
