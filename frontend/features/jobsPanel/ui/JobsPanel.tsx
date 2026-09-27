import { Search } from "lucide-react";
import styles from "./JobsPanel.module.css";
import Link from "next/link";

export const JobsPanel = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.input_container}>
        <Search size={20} className={styles.logo} />
        <input className={`${styles.input} inp`} placeholder="Search job" />
      </div>

      <Link href={"/vacancies/create"} className={`${styles.button} but-prim`}>
        Create Vacancy
      </Link>
    </div>
  );
};
