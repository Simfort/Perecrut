import { useVacancy } from "@/entities/vacancies";
import styles from "./AboutVacancy.module.css";
import { Calendar, Copy, Timer } from "lucide-react";

export const AboutVacancy = () => {
  const { vacancy } = useVacancy();
  const linkText = vacancy
    ? `${process.env.NEXT_PUBLIC_CLIENT_URL}/vacancies/${vacancy?.id}/candidate`
    : "Vacancy link for candidate";
  const handleCopy = () => {
    navigator.clipboard.writeText(linkText);
  };
  return (
    <section className={styles.about}>
      <h1>{vacancy?.title || "Title in process..."}</h1>
      <h4 className={styles.undertitle}>Interview with recruter</h4>
      <hr className={styles.underline} />
      <p className={styles.description}>
        {vacancy?.description || "Description in process..."}
      </p>
      <div className={styles.instructions}>
        <div className={styles.instruction}>
          <Calendar className={styles.logo} />
          <div className={styles.container_info}>
            <h6>Date</h6>
            <p className={styles.info_text}>
              {vacancy?.created_at || "Your Date"}
            </p>
          </div>
        </div>{" "}
        <div className={styles.instruction}>
          <Copy className={styles.logo} />
          <div className={styles.container_info}>
            <h6>Copy link for candidate</h6>
            <p onClick={handleCopy} className={styles.info_copy}>
              {linkText}
            </p>
          </div>
        </div>{" "}
        <div className={styles.instruction}>
          <Timer className={styles.logo} />
          <div className={styles.container_info}>
            <h6>Time</h6>
            <p className={styles.info_text}>Select comforable time</p>
          </div>
        </div>{" "}
      </div>
    </section>
  );
};
