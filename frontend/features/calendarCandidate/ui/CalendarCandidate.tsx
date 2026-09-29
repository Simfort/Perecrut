import { useRouter } from "next/navigation";
import { Calendar } from "./Calendar";
import styles from "./CalendarCandidate.module.css";

export const CalendarCandidate = () => {
  const router = useRouter();

  return (
    <div>
      <Calendar />
      <button
        onClick={() => router.push("?step=0")}
        className={`${styles.button} but-prim`}
      >
        Back
      </button>
    </div>
  );
};
