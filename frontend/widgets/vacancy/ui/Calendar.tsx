import styles from "./Calendar.module.css";
import ColorsPanel from "./ColorsPanel";

import { CalendarItem } from "./CalendarItem";
import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";
import { updateVacancyAction } from "@/entities/vacancies/api/updateVacancyAction";
import { CalendarInterval } from "./CalendarInterval";
import { Times } from "./Times";
import { Copy } from "lucide-react";
import { useState } from "react";
import { ButtonCopy } from "./ButtonCopy";
import { CalendarDate } from "./CalendarDate";

export const Calendar = () => {
  const { vacancy } = useVacancy();

  return (
    <div className={styles.calendar}>
      <div className={styles.info_vacancy}>
        <div className={styles.info_panel}>
          <h3>Calendar</h3>
          <CalendarDate />
          <button
            onClick={async () => {
              if (vacancy) updateVacancyAction(vacancy);
            }}
            className={"but-prim"}
          >
            Save
          </button>
        </div>
        <div className={styles.settings}>
          <CalendarInterval />
          <ColorsPanel />
        </div>
      </div>
      <ButtonCopy />
      <Times />
    </div>
  );
};
