import { FEATURES_LIST } from "../constants/feturesList";
import styles from "./Features.module.css";

export const Features = () => {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.decor_1} aria-hidden></div>{" "}
      <p className={styles.undertitle}>FEATURES</p>
      <h2 className={styles.title}>Everything you need to hire great people</h2>
      <p className={styles.description}>
        InterviewFlow gives you the tools to streamline your hiring process,
        from scheduling to collaboration — all in one place.
      </p>
      <div className={styles.features_elements}>
        {FEATURES_LIST.map((feature, index) => (
          <div className={styles.feature} key={index}>
            <div className={styles.feature_logo}>{feature.logo}</div>
            <h5 className={styles.feature_title}>{feature.title}</h5>
            <p className={styles.feature_description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
