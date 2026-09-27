import { Fragment } from "react/jsx-runtime";
import { STEP_LIST } from "../constants/stepList";
import styles from "./HowItWorks.module.css";
import { ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section id="howitworks" className={styles.hwt}>
      <div className={styles.decor_1} aria-hidden></div>{" "}
      <p className={styles.undertitle}>HOW IT WORKS</p>
      <h2 className={styles.title}>
        From scheduling to hiring, in 3 simple steps
      </h2>
      <p className={styles.description}>
        Take the hassle out of interview coordination. Our platform makes it
        easy to find the right time, keep everyone aligned, and move great
        candidates forward.
      </p>
      <div className={styles.steps}>
        {STEP_LIST.map((step, index) => (
          <Fragment key={index}>
            <div className={styles.step}>
              <div className={styles.step_logo}>{step.logo}</div>
              <div className={styles.step_info}>
                <p className={styles.step_num}>{index + 1}</p>
                <div className={styles.names}>
                  <h5 className={styles.step_title}>{step.title}</h5>
                  <p className={styles.step_description}>{step.description}</p>
                </div>
              </div>
            </div>
            {index < STEP_LIST.length - 1 && (
              <ArrowRight className={styles.arrow} />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
};
