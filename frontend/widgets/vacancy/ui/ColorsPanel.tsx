import { useColor } from "../lib/store/useColor";
import styles from "./Calendar.module.css";

export default function ColorsPanel() {
  const { setCurrentColor, currentColor } = useColor();
  return (
    <div>
      <div
        onClick={() => setCurrentColor("gray")}
        style={{
          backgroundColor: "gray",
          border: currentColor === "gray" ? "1px solid black" : "",
        }}
        className={styles.block_color}
      ></div>
    </div>
  );
}
