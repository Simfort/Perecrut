import { Candidate } from "@/entities/candidates";
import styles from "./CandidateItem.module.css";

interface CandidateItemProps {
  candidate: Pick<Candidate, "firstname" | "lastname" | "description"> & {
    vacancy: string;
  };
}

export const CandidateItem = ({ candidate }: CandidateItemProps) => {
  return (
    <div className={styles.item}>
      {" "}
      <div className={styles.info}>
        <p className={styles.fullname}>
          {candidate.firstname} {candidate.lastname}
        </p>
        <p className={styles.description}>{candidate.description}</p>
        <p className={styles.vacancy}>Vacancy: {candidate.vacancy}</p>
      </div>
    </div>
  );
};
