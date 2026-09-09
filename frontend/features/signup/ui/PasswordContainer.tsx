"use client";

import { Eye, EyeClosed } from "lucide-react";
import styles from "./forms.module.css";
import { useState } from "react";
import { CreateUserActionState } from "@/entities/recruters";

type PasswordContainerProps = {
  state: CreateUserActionState;
};

export const PasswordContainer = ({ state }: PasswordContainerProps) => {
  const [showFlag, setShowFlag] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.container__password}>
        <label htmlFor="firstname">Password</label>
        <div className={styles.container_rightPassword}>
          <input
            defaultValue={state.data.password}
            type={showFlag ? "text" : "password"}
            className={`inp ${state.error ? (state.error.password ? "invalid" : "valid") : ""}`}
            name="password"
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
          className={`inp ${
            state.error
              ? state.error.confrimPassword || state.error.password
                ? "invalid"
                : "valid"
              : ""
          }`}
          name="confrimPassword"
          defaultValue={state.data.confrimPassword}
          autoComplete="off"
          placeholder="Confrim password"
        />
      </div>
    </div>
  );
};
