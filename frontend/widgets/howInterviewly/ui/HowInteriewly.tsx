import Image from "next/image";
import { INTERVIEWLY_LIST } from "../constants/interviewlyList";
import styles from "./HowInterviewly.module.css";

export const HowInterviewly = () => {
  return (
    <section id="interviewly" className={styles.interviewly}>
      <div className={styles.decor_1} aria-hidden></div>{" "}
      <div className={styles.decor_2} aria-hidden></div>
      <p className={styles.undertitle}>WHY INTERVIEWLY</p>
      <h2 className={styles.title}>
        More than practice. It’s your hiring advantage.
      </h2>
      <p className={styles.description}>
        Interviewly isn’t just a tool — it’s a complete preparation partner that
        helps you build confidence, improve faster, and land the job that’s
        right for you.
      </p>
      <div className={styles.grid}>
        {INTERVIEWLY_LIST.map((interview, index) => (
          <div
            key={index}
            className={`${styles.interview} ${styles[`--${index}`]}`}
          >
            <div className={styles.interview_logo}>{interview.logo}</div>
            <h5 className={styles.interview_title}>{interview.title}</h5>
            <p className={styles.interview_description}>
              {interview.description}
            </p>
          </div>
        ))}
        <Image
          width={500}
          height={500}
          alt="Woman saw in computer"
          className={styles.bgInteriewly}
          src={"/bgInterviewly.png"}
        />
      </div>
    </section>
  );
};
