import { ChevronDown, ChevronUp } from "lucide-react";
import { useColor } from "../../../entities/vacancies/lib/store/useColor";
import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";
import styles from "./ColorsPanel.module.css";
import { useEffect, useRef, useState } from "react";

export default function ColorsPanel() {
  const { setCurrentColor, currentColor } = useColor();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { vacancy } = useVacancy();
  const [isOpenFlag, setIsOpenFlag] = useState(false);
  const colors = Object.entries(vacancy!.colors);
  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      const element = panelRef.current;
      const target = e.target as Element;
      if (element && !element?.contains(target)) {
        setIsOpenFlag(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div ref={panelRef} className={styles.panel}>
      <button
        onClick={() => setIsOpenFlag(!isOpenFlag)}
        className={styles.button}
      >
        <div className={styles.current_color}>
          {currentColor ? (
            <>
              <p
                className={styles.block_color}
                style={{
                  backgroundColor: currentColor,
                }}
                aria-label={`Current color: ${currentColor}`}
              ></p>
              {currentColor}
            </>
          ) : (
            "N/A"
          )}
        </div>
        {isOpenFlag ? (
          <ChevronUp className={styles.logo} size={20} />
        ) : (
          <ChevronDown className={styles.logo} size={20} />
        )}
      </button>
      <div>
        {isOpenFlag && (
          <div className={styles.modal}>
            <h6>Candidates</h6>
            <div className={styles.colors}>
              {vacancy?.candidates.map((candidate) => (
                <button
                  key={candidate.id}
                  onClick={() => setCurrentColor(candidate.color)}
                  style={{
                    backgroundColor: candidate.color,
                  }}
                  className={`${styles.candidate_color} ${candidate.color === currentColor ? styles.active : ""}`}
                >
                  {candidate.color}
                </button>
              ))}
            </div>{" "}
            <h6>Colors</h6>
            <div className={styles.colors}>
              {colors.map((color) => (
                <button
                  key={color[1]}
                  onClick={() => setCurrentColor(color[1])}
                  style={{
                    backgroundColor: color[1],
                  }}
                  className={`${styles.candidate_color} ${color[1] === currentColor ? styles.active : ""}`}
                >
                  {color[1]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
