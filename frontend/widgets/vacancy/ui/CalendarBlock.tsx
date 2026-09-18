import { useState } from "react";
import { useColor } from "../lib/store/useColor";
import styles from "./CalendarBlock.module.css";

export const CalendarBlock = () => {
  const { setCurrentColor, currentColor } = useColor();
  const [clicked, setClicked] = useState(false);
  return (
    <div
      style={clicked ? { backgroundColor: currentColor } : {}}
      onClick={() => setClicked(!clicked)}
      className={styles.calendar_block}
    ></div>
  );
};
