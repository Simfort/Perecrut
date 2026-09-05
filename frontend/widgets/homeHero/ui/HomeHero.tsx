import Link from "next/link";
import styles from "./HomeHero.module.css";
export const HomeHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSection__container}>
        <h1 className={styles.heroSection__title}>
          Smart Intreview Scheduling <br />
          for Modern Teams.
        </h1>
        <p>Save time,automate bookings,and provide a semiiese candidate</p>
        <Link href={"/signup"} className="but-prim">
          Let`s go
        </Link>
      </div>
    </section>
  );
};
