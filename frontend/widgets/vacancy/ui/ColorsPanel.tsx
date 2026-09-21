import { useColor } from "../../../entities/vacancies/lib/store/useColor";
import { useVacancy } from "../../../entities/vacancies/lib/store/useVacancy";
import styles from "./Calendar.module.css";

export default function ColorsPanel() {
  const { setCurrentColor, currentColor } = useColor();
  const { vacancy } = useVacancy();
  const colors = Object.entries(vacancy!.colors);

  return (
    <div>
      {colors.map((color) => (
        <div key={color[0]}>
          <p>{color[0]}</p>
          <div
            onClick={() => setCurrentColor(color[1])}
            style={{
              backgroundColor: color[1],
              border:
                currentColor === color[1] ? "1px solid var(--primary)" : "",
            }}
            className={styles.block_color}
          ></div>
        </div>
      ))}
      <div>
        {vacancy?.candidates.map((candidate) => (
          <div key={candidate.id}>
            <p>{candidate.firstname}</p>
            <div
              onClick={() => setCurrentColor(candidate.color)}
              style={{
                backgroundColor: candidate.color,
                border:
                  currentColor === candidate.color
                    ? "1px solid var(--primary)"
                    : "",
              }}
              className={styles.block_color}
            ></div>
          </div>
        ))}
      </div>
      <button>https://localhost:3001/vacancies/{vacancy!.id}/candidate</button>
    </div>
  );
}
