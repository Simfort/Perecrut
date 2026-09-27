import styles from "./CandidatesContainer.module.css";
import { useVacancies } from "../lib/store/useVacancies";
import { CandidatesPanel } from "@/features/candidatesPanel";
import { parseCandidates } from "../lib/parseCandidates";
import { CandidateItem } from "./CandidateItem";

export const CandidatesContainer = () => {
  const { vacancies } = useVacancies();
  const candidates = parseCandidates(vacancies!);
  return (
    <section className={styles.container}>
      <CandidatesPanel />
      <div className={styles.candidates}>
        {candidates?.map((candidate, index) => (
          <CandidateItem key={index} candidate={candidate} />
        ))}
      </div>
    </section>
  );
};
