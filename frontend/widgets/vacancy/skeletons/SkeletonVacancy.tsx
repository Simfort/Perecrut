import { SkeletonLine } from "@/shared/ui/SkeletonLine";
import styles from "./SkeletonVacancy.module.css";

export const SkeletonVacancy = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.skeleton}>
        <SkeletonLine />
      </div>

      <div className={styles.skeleton}>
        {" "}
        <SkeletonLine />
      </div>
    </div>
  );
};
