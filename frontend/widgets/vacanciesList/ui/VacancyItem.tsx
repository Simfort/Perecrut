"use client";
import { Vacancy } from "@/entities/vacancies";
import styles from "./vacancies.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VacancyItemProps {
  data: Vacancy;
}

export const VacancyItem = ({ data }: VacancyItemProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/vacancies/${data.id}`)}
      className={styles.item}
    >
      <div className={styles.left_panel}>
        <h3>{data.title}</h3> <p> {data.organization}</p>
        <div className={styles.emp_type}>{data.emp_type}</div>
      </div>
      <div className={styles.right_panel}>
        <p className={styles.salary}>
          ${data.salary_min} - ${data.salary_max}
        </p>

        <Link
          href={`/vacancies/${data.id}/canditate`}
          className={`but-prim ${styles.button}`}
        >
          Add candidate
        </Link>
      </div>
    </div>
  );
};
