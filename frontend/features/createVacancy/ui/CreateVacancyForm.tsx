"use client";
import { useActionState } from "react";
import styles from "./CreateVacancyForm.module.css";
import { createVacancyAction } from "@/entities/vacancies";

export const CreateVacancyForm = () => {
  const [state, dispatchAction] = useActionState(createVacancyAction, {});
  return (
    <form
      id="create-vacancy-form"
      action={dispatchAction}
      className={styles.form}
    >
      <div className={styles.first_container}>
        <div>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            defaultValue={state.data?.title}
            name="title"
            placeholder="Senior Frontend Developer"
            className={`inp ${state.error ? (state.error.title ? "invalid" : "valid") : ""}`}
          />{" "}
        </div>{" "}
        <div>
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            defaultValue={state.data?.organization}
            name="organization"
            placeholder="OOO 'RAI'"
            className={`inp ${state.error ? (state.error.organization ? "invalid" : "valid") : ""}`}
          />{" "}
        </div>
      </div>{" "}
      <div className={styles.first_container}>
        <div>
          <label htmlFor="salary_min">Salary Min</label>
          <input
            type="number"
            defaultValue={state.data?.salary_min}
            name="salary_min"
            placeholder="50k"
            min={0}
            className={`inp ${state.error ? (state.error.salary_min ? "invalid" : "valid") : ""}`}
          />
        </div>{" "}
        <div>
          <label htmlFor="salary_max">Salary Max</label>
          <input
            type="number"
            name="salary_max"
            defaultValue={state.data?.salary_max}
            placeholder="120k"
            min={0}
            className={`inp ${state.error ? (state.error.salary_max ? "invalid" : "valid") : ""}`}
          />{" "}
        </div>{" "}
        <div>
          <label htmlFor="emp_type">Emp Type</label>
          <select
            form="create-vacancy-form"
            name="emp_type"
            className={`inp ${state.error ? (state.error.emp_type ? "invalid" : "valid") : ""}`}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>{" "}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          className={`inp ${state.error ? (state.error.description ? "invalid" : "valid") : ""}`}
          name="description"
          defaultValue={state.data?.description}
          placeholder="About job..."
        />
      </div>
      <button className="but-prim">Create</button>
    </form>
  );
};
