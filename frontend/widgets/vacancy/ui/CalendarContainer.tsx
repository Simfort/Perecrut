import { ChevronDown, ChevronUp } from "lucide-react";
import { Calendar } from "./Calendar";
import { useState } from "react";
import styles from "./CalendarContainer.module.css";

export const CalendarContainer = () => {
  const [openFlag, setOpenFlag] = useState(false);
  return (
    <section className={styles.section}>
      <div className={styles.decor} aria-hidden></div>
      <button
        onClick={() => setOpenFlag(!openFlag)}
        className={`but-prim ${styles.button}`}
      >
        Open Calendar {openFlag ? <ChevronDown /> : <ChevronUp />}
      </button>
      {openFlag && <Calendar />}
    </section>
  );
};
