import { useVacancy } from "@/entities/vacancies";
import styles from "./Calendar.module.css";
import { CalendarItem } from "./CalendarItem";
import { updateVacancyAction } from "@/entities/vacancies/api/updateVacancyAction";
import { CalendarDate } from "./CalendarDate";
import { useNotificate } from "@/shared/lib/store/useNotificate";

export const Calendar = () => {
  const data = new Date();
  const { vacancy } = useVacancy();
  const { setData } = useNotificate();
  const handleSave = async () => {
    if (vacancy) {
      const result = await updateVacancyAction(vacancy);
      if (result) {
        setData({
          title: "Succes Created Candidate",
          description: "You success save candidate",
          status: "success",
        });
      }
    }
  };
  return (
    <div className={styles.calendar}>
      <div className={styles.info_vacancy}>
        <h3>Calendar</h3>
        <CalendarDate />
        <button onClick={handleSave} className={`but-prim ${styles.button}`}>
          Save
        </button>
      </div>
      <div className={styles.time_container}>
        <ul className={styles.time_list}>
          {vacancy!.times[data.toDateString()].map((time, index) => (
            <CalendarItem index={index} time={time} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};
