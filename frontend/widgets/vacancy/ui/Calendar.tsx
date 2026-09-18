import { getIntervalsHours } from "@/shared/utils/getInterevalsHours";
import { CalendarBlock } from "./CalendarBlock";
import styles from "./Calendar.module.css";
import ColorsPanel from "./ColorsPanel";

export const Calendar = () => {
  const data = new Date();
  const times = getIntervalsHours(60);
  return (
    <div>
      <h3>Calendar</h3>
      <div>{data.toDateString()}</div>
      <ColorsPanel />
      <div>
        <ul className={styles.time_list}>
          {times.map((time, index) => (
            <li className={styles.time_item} key={time}>
              <time>{time}</time> <CalendarBlock key={time + index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
