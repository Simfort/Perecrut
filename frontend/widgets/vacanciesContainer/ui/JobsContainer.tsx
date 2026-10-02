import { JobsPanel, useCurrentVacancies } from "@/features/jobsPanel";
import styles from "./JobsContainer.module.css";

import dynamic from "next/dynamic";
import { SkeletonJob } from "../skeletons/SkeletonJob";

const JobItem = dynamic(() => import("./JobItem").then((mod) => mod.JobItem), {
  loading: () => <SkeletonJob />,
  ssr: false,
});

export const JobsContainer = () => {
  const { currentVacancies } = useCurrentVacancies();
  if (!currentVacancies) {
    return (
      <section className={styles.container}>
        <JobsPanel />
        <div className={styles.jobs}>
          {new Array(7).fill(null).map((_, index) => (
            <SkeletonJob key={index} />
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className={styles.container}>
      <JobsPanel />
      <div className={styles.jobs}>
        {currentVacancies?.map((vacancy, index) => (
          <JobItem key={index} vacancy={vacancy} />
        ))}
      </div>
    </section>
  );
};
