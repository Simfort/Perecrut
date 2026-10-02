import styles from "./CandidatesContainer.module.css";
import { CandidatesPanel } from "@/features/candidatesPanel";
import { CandidateItem } from "./CandidateItem";
import { useCurrentCandidates } from "@/features/candidatesPanel/lib/store/useCurrentCandidates";

export const CandidatesContainer = () => {
  const { currentCandidates } = useCurrentCandidates();
  return (
    <section className={styles.container}>
      <CandidatesPanel />
      <div className={styles.candidates}>
        {currentCandidates?.map((candidate, index) => (
          <CandidateItem key={index} candidate={candidate} />
        ))}
      </div>
    </section>
  );
};
