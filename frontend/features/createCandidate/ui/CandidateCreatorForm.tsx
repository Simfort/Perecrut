"use client";

import { createCandidateAction } from "@/entities/candidates/api/createCandidateAction";
import { useVacancy } from "@/entities/vacancies";
import styles from "./CandidateCreatorForm.module.css";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export const CandidateCreatorForm = () => {
  const { vacancy } = useVacancy();
  const [state, dispatchAction] = useActionState(createCandidateAction, {
    data: {
      firstname: "",
      lastname: "",
      description: "",
      color: "black",
    },
    vacancy_id: vacancy!.id,
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("?step=1");
    }
  }, [state.success]);
  return (
    <form className={styles.form} action={dispatchAction}>
      {" "}
      <h3 className={styles.form__title}>Create candidate</h3>
      <p className={styles.form__description}>
        Join the selected vacancy and earn money.
      </p>
      <div className={styles.input_container}>
        <label htmlFor="firstname">Firstname</label>{" "}
        <input
          type="text"
          name="firstname"
          placeholder="Linus"
          className={`inp ${state.error ? (state.error.firstname ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.firstname}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          placeholder="Torvalds"
          className={`inp ${state.error ? (state.error.lastname ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.lastname}
        />
      </div>{" "}
      <div className={styles.input_container}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Info about..."
          className={`inp ${state.error ? (state.error.description ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.description}
        />
      </div>{" "}
      <div className={styles.input_container}>
        <label htmlFor="color">Color</label>
        <input
          type="color"
          name="color"
          className={` ${state.error ? (state.error.color ? "invalid" : "valid") : ""}  ${styles.color}`}
          defaultValue={state.data.color}
        />
      </div>
      <button className="but-acc">Next</button>
    </form>
  );
};
