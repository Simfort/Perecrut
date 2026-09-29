import { useVacancy } from "@/entities/vacancies";
import styles from "./CalendarItem.module.css";
import { useColor } from "@/entities/vacancies/lib/store/useColor";
import { Plus } from "lucide-react";
import { useDate } from "@/shared/lib/store/useDate";

interface CalendarItemProps {
  time: Record<string, string>;
  index: number;
}

export const CalendarItem = ({ time, index }: CalendarItemProps) => {
  const entries = Object.entries(time)[0];
  const { currentColor } = useColor();
  const { date } = useDate();
  const { setVacancy, vacancy } = useVacancy();
  const currentCandidate = vacancy?.candidates.find(
    (candidate) => candidate.color === entries[1],
  );
  const handleClick = () => {
    const dateString = date.toDateString();
    const newVacancyTimes = { ...vacancy?.times };
    console.log(entries);
    newVacancyTimes[dateString][index] = {
      [entries[0]]: currentColor === entries[1] ? "" : currentColor || "",
    };
    const newVacancies = {
      ...vacancy!,
      times: newVacancyTimes,
    };
    setVacancy(newVacancies);
  };
  return (
    <li className={styles.time_item}>
      <time>{entries[0]}</time>{" "}
      <button
        style={{
          borderColor: entries[1],
        }}
        onClick={handleClick}
        className={`${styles.calendar_block} ${currentCandidate ? styles.active : ""}`}
      >
        <div
          className={styles.ball}
          style={{ backgroundColor: entries[1] }}
          aria-label={`Color time ${entries[1]}`}
        ></div>
        <p className={styles.text}>
          {currentCandidate ? (
            `${currentCandidate?.firstname} ${currentCandidate.lastname}`
          ) : (
            <>
              {entries[1] ? "Other" : "Add color"}{" "}
              <Plus className={styles.logo} />
            </>
          )}
        </p>
      </button>
    </li>
  );
};
