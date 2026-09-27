import { VacancyToGetAllFormatted } from "@/entities/vacancies";
import styles from "./JobItem.module.css";
import { Calendar, Circle, Clock, Globe, Users } from "lucide-react";
import Link from "next/link";

interface JobItemProps {
  vacancy: VacancyToGetAllFormatted;
}

export const JobItem = ({ vacancy }: JobItemProps) => {
  return (
    <Link href={`/vacancies/${vacancy.id}`} className={styles.item}>
      <div className={styles.info}>
        <h5 className={styles.title}>{vacancy.title}</h5>
        <div className={styles.undertitle_container}>
          <div className={styles.logo_container}>
            <Clock size={20} />
            <p className={styles.under}>{vacancy.emp_type}</p>
          </div>
          <div className={styles.space_decor}></div>{" "}
          <div className={styles.logo_container}>
            <Globe size={20} />
            <p className={styles.under}>{vacancy.organization}</p>
          </div>
        </div>

        <p className={styles.description}>{vacancy.description}</p>
        <div className={styles.container_date}>
          <Calendar size={20} className={styles.logo} />{" "}
          <p>{new Date(vacancy.created_at).toLocaleDateString()}</p>
        </div>
      </div>{" "}
      <div className={styles.right_info}>
        <p className={styles.salary}>
          <span>{vacancy.salary_min} $</span> -{" "}
          <span>{vacancy.salary_max} $</span>
        </p>
        <p className={styles.candidates_len}>
          <Users />
          {vacancy.candidates.length}
        </p>
      </div>
    </Link>
  );
};
