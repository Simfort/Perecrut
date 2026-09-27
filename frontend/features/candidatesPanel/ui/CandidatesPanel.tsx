import { Search } from "lucide-react";
import styles from "./CandidatesPanel.module.css";

export const CandidatesPanel = () => {
  return (
    <div className={styles.panel}>
      <div className={styles.input_container}>
        <Search size={20} className={styles.logo} />
        <input
          className={`${styles.input} inp`}
          placeholder="Search candidate"
        />
      </div>
    </div>
  );
};
