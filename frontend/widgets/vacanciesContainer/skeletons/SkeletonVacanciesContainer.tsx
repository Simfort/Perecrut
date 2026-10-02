import { SkeletonLine } from "@/shared/ui/SkeletonLine";
import styles from "./SkeletonVacanciesContainer.module.css";

export const SkeletonVacanciesContainer = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.skeleton}>
        <SkeletonLine />
      </div>
      <div className={styles.skeleton}>
        {" "}
        <SkeletonLine />
      </div>
      <div className={styles.skeleton}>
        {" "}
        <SkeletonLine />
      </div>
    </div>
  );
};
