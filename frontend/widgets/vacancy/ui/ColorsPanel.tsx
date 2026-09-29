import { ChevronDown, ChevronUp } from "lucide-react";
import { useColor } from "../../../entities/vacancies/lib/store/useColor";
import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";
import styles from "./ColorsPanel.module.css";
import { useState } from "react";

export default function ColorsPanel() {
  const { setCurrentColor, currentColor } = useColor();
  const { vacancy } = useVacancy();
  const [isOpenFlag, setIsOpenFlag] = useState(false);
  const colors = Object.entries(vacancy!.colors);

  return (
    <div className={styles.panel}>
      <button
        onClick={() => setIsOpenFlag(!isOpenFlag)}
        className={styles.button}
      >
        <p className={styles.current_color}>
          {currentColor ? (
            <>
              <div
                className={styles.block_color}
                style={{
                  backgroundColor: currentColor,
                }}
                aria-label={`Current color: ${currentColor}`}
              ></div>
              {currentColor}
            </>
          ) : (
            "N/A"
          )}
        </p>
        {isOpenFlag ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
