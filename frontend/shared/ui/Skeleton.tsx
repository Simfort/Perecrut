import { SkeletonLine } from "@/shared/ui/SkeletonLine";
import styles from "./Skeleton.module.css";

export const Skeleton = () => {
  return (
    <div className={styles.skeleton_container}>
      <div className={styles.skeleton}>
        <SkeletonLine />
      </div>
    </div>
  );
};
