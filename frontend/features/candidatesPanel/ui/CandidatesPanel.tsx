import { Search } from "lucide-react";
import styles from "./CandidatesPanel.module.css";
import { useVacancies } from "@/entities/vacancies";

import { useDeferredValue, useEffect, useState } from "react";
import { useCurrentVacancies } from "@/features/jobsPanel";
import { parseCandidates } from "../lib/parseCandidates";
import { useCurrentCandidates } from "../lib/store/useCurrentCandidates";

export const CandidatesPanel = () => {
  const { vacancies } = useVacancies();
  const { setCurrentCandidates } = useCurrentCandidates();
  const [title, setTitle] = useState("");
  const defferedValue = useDeferredValue(title);
  useEffect(() => {
    if (vacancies) {
      const lowerTitle = defferedValue.toLowerCase();
      const candidates = parseCandidates(vacancies).filter((candidate) =>
        (candidate.firstname + candidate.lastname)
          .toLowerCase()
          .includes(lowerTitle),
      );
      setCurrentCandidates(candidates);
    }
  }, [defferedValue]);
  return (
    <div className={styles.panel}>
      <div className={styles.input_container}>
        <Search size={20} className={styles.logo} />
        <input
          onChange={(e) => setTitle(e.target.value)}
          className={`${styles.input} inp`}
          placeholder="Search candidate"
        />
      </div>
    </div>
  );
};
