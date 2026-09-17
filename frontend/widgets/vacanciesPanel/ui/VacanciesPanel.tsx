import Link from "next/link";
import styles from "./VacanciesPanel.module.css";

export const VacanciesPanel = () => {
  return (
    <section className={styles.panel}>
      <input
        type="text"
        placeholder="Search Vacancy"
        className={`${styles.search} inp`}
      />

      <Link href={"/vacancies/create"} className="but-prim">
        + Create Vacancy
      </Link>
    </section>
  );
};
