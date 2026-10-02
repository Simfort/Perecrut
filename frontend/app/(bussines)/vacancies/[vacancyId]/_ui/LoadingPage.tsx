import { SkeletonVacancy } from "@/widgets";
import styles from "./LoadingPage.module.css";

export const Loading = () => {
  return (
    <div className={styles.page}>
      <SkeletonVacancy />
    </div>
  );
};
