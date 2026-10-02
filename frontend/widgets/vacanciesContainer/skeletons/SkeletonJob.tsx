import { SkeletonLine } from "@/shared/ui/SkeletonLine";
import styles from "./SkeletonJob.module.css";

export const SkeletonJob = () => {
  return (
    <div className={styles.item}>
      <SkeletonLine />
    </div>
  );
};
