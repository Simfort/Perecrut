import styles from "./Calendar.module.css";
import ColorsPanel from "./ColorsPanel";

import { CalendarItem } from "./CalendarItem";
import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";
import { updateVacancyAction } from "@/entities/vacancies/api/updateVacancyAction";
import { CalendarInterval } from "./CalendarInterval";

export const Calendar = () => {
  const data = new Date();
  const { vacancy } = useVacancy();
  console.log(vacancy);
  return (
    <div>
      <div className={styles.info_vacancy}>
        <div>
          {" "}
          <h3>Calendar</h3>
          <div>{data.toDateString()}</div>{" "}
          <button
            onClick={async () => {
              if (vacancy) updateVacancyAction(vacancy);
            }}
            className="but-prim"
          >
            Save
          </button>
        </div>

        <ColorsPanel />
        <CalendarInterval />
      </div>
      <div>
        <ul className={styles.time_list}>
          {vacancy!.times.map((time, index) => (
            <CalendarItem index={index} time={time} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};
