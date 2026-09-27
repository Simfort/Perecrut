import { PANELS } from "../constants/panels";
import { useCurrentContainer } from "../lib/store/useCurrentContainer";
import styles from "./VacanciesInfoAside.module.css";

export const VacanciesInfoAside = () => {
  const { setCurrent, current } = useCurrentContainer();
  return (
    <aside className={styles.aside}>
      {PANELS.map((pan, i) => (
        <button
          onClick={() => setCurrent(i)}
          className={`${styles.button} ${current === i ? styles.active : ""}`}
          key={i}
        >
          {pan.logo}
          <p>{pan.title}</p>
        </button>
      ))}
    </aside>
  );
};
