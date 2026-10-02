import { Search } from "lucide-react";
import styles from "./JobsPanel.module.css";
import Link from "next/link";

import { useDeferredValue, useEffect, useState } from "react";
import { useCurrentVacancies } from "../lib/store/useCurrentVacancies";
import { useVacancies } from "@/entities/vacancies";

export const JobsPanel = () => {
  const { currentVacancies, setCurrentVacancies } = useCurrentVacancies();
  const { vacancies } = useVacancies();
  const [title, setTitle] = useState("");
  const defferedValue = useDeferredValue(title);
  useEffect(() => {
    if (vacancies) {
      const lowerTitle = defferedValue.toLowerCase();
      setCurrentVacancies(
        vacancies.filter((vacancy) =>
          vacancy.title.toLowerCase().includes(lowerTitle),
        ),
      );
    }
  }, [defferedValue]);
  return (
    <div className={styles.panel}>
      <div className={styles.input_container}>
        <Search size={20} className={styles.logo} />
        <input
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.input} inp`}
          placeholder="Search job"
        />
      </div>

      <Link href={"/vacancies/create"} className={`${styles.button} but-prim`}>
        Create Vacancy
      </Link>
    </div>
  );
};
