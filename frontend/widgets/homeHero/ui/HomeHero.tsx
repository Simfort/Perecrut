import styles from "./HomeHero.module.css";
import { ABOUTS } from "../constants/about";

export const HomeHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSection__container}>
        <p className={styles.heroSection__undertitle}>
          SMART INTERVIEW SCHELDULER
        </p>
        <h1 className={styles.heroSection__title}>
          Simplify your interview process, from start to finish
        </h1>
        <p className={styles.heroSection__description}>
          Interviewly helps you schedule interviews, coordinate with your team,
          and create a better candidate experience — all in one place.
        </p>
        <ul className={styles.heroSection__abouts}>
          {ABOUTS.map((about, index) => (
            <li className={styles.abouts__li} key={index}>
              <div className={styles.abouts__icon}>{about.logo}</div>

              <h6 className={styles.abouts__title}>{about.title}</h6>
              <p className={styles.abouts__description}>{about.description}</p>
            </li>
          ))}
        </ul>
      </div>{" "}
      <div className={styles.heroSection__example}>
        <div className={styles.example__des} />
      </div>
    </section>
  );
};
