import { SkeletonVacanciesContainer } from "@/widgets";
import styles from "./LoadingPage.module.css";

export const Loading = () => {
  return (
    <div className={styles.page}>
      <SkeletonVacanciesContainer />
    </div>
  );
};
