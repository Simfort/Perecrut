import { JobsPanel } from "@/features/jobsPanel";
import styles from "./JobsContainer.module.css";
import { useVacancies } from "../lib/store/useVacancies";
import { JobItem } from "./JobItem";

export const JobsContainer = () => {
  const { vacancies } = useVacancies();

  return (
    <section className={styles.container}>
      <JobsPanel />
      <div className={styles.jobs}>
        {vacancies?.map((vacancy, index) => (
          <JobItem key={index} vacancy={vacancy} />
        ))}
      </div>
    </section>
  );
};
