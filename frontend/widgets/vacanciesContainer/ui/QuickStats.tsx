import { Calendar, Loader, Users } from "lucide-react";
import { parseCandidates } from "../../../features/candidatesPanel/lib/parseCandidates";
import styles from "./QuickStats.module.css";
import { useVacancies } from "@/entities/vacancies";

export const QuickStats = () => {
  const { vacancies } = useVacancies();
  const candidates = parseCandidates(vacancies || []);
  if (!vacancies)
    return (
      <section className={styles.stats}>
        <h4>Quick Stats</h4>
        <div className={styles.container_stats}>
          {" "}
          <div className={styles.container}>
            <Calendar className={styles.logo} />
            <div className={styles.container_info}>
              <h4>
                <Loader className="spin" />
              </h4>
              <p className={styles.undertitle}>Total Postings</p>
            </div>
          </div>{" "}
          <div className={styles.container}>
            <Users className={styles.logo} />
            <div className={styles.container_info}>
              <h4>
                {" "}
                <Loader className="spin" />
              </h4>
              <p className={styles.undertitle}>All Candidates</p>
            </div>
          </div>
        </div>
      </section>
    );
  return (
    <section className={styles.stats}>
      <h4>Quick Stats</h4>
      <div className={styles.container_stats}>
        {" "}
        <div className={styles.container}>
          <Calendar className={styles.logo} />
          <div className={styles.container_info}>
            <h4>{vacancies?.length}</h4>
            <p className={styles.undertitle}>Total Postings</p>
          </div>
        </div>{" "}
        <div className={styles.container}>
          <Users className={styles.logo} />
          <div className={styles.container_info}>
            <h4>{candidates?.length}</h4>
            <p className={styles.undertitle}>All Candidates</p>
          </div>
        </div>
      </div>
    </section>
  );
};
