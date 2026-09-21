import { useVacancy } from "@/entities/vacancies";
import styles from "./Calendar.module.css";
import { CalendarItem } from "./CalendarItem";
import { updateVacancyAction } from "@/entities/vacancies/api/updateVacancyAction";

export const Calendar = () => {
  const data = new Date();
  const { vacancy } = useVacancy();
  return (
    <div>
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
