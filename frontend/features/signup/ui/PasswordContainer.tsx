"use client";

import { Eye, EyeClosed } from "lucide-react";
import styles from "./PasswordContainer.module.css";
import { useState } from "react";

export const PasswordContainer = () => {
  const [showFlag, setShowFlag] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.container__password}>
        <label htmlFor="firstname">Password</label>
        <div className={styles.container_rightPassword}>
          <input
            type={showFlag ? "text" : "password"}
            className="inp"
            name="firstname"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowFlag(!showFlag)}
            className={styles.container_showPassword}
            aria-label="Show password">
            {showFlag ? <EyeClosed /> : <Eye />}
          </button>
        </div>
      </div>
      <div className={styles.container__password}>
        <label htmlFor="firstname">Confrim Password</label>
        <input
          type="text"
          className="inp"
          name="lastname"
          autoComplete="off"
          placeholder="Confrim password"
        />
      </div>
    </div>
  );
};
