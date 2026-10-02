"use client";
import { useActionState, useEffect } from "react";
import styles from "./CreateVacancyForm.module.css";
import { createVacancyAction } from "@/entities/vacancies";
import { useNotificate } from "@/shared/lib/store/useNotificate";
import { useRouter } from "next/navigation";
import { parseErrorToStr } from "@/shared/utils/parseErrorToStr";
import { Loader } from "lucide-react";

export const CreateVacancyForm = () => {
  const [state, dispatchAction, isPending] = useActionState(
    createVacancyAction,
    {},
  );
  const { setData } = useNotificate();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setData({
        status: "success",
        title: "Success",
        description: "Your account is login",
      });
      router.push("/vacancies");
    } else if (state.error) {
      console.log(state.error);
      setData({
        status: "error",
        title: "Error Valid Fields",
        description: parseErrorToStr(state),
      });
    }
  }, [state.success, state.error]);
  return (
    <form
      id="create-vacancy-form"
      action={dispatchAction}
      className={styles.form}
    >
      {" "}
      <h3 className={styles.form__title}>Create vacancy</h3>
      <p className={styles.form__description}>
        Let’s create a vacancy and start earning money.
      </p>
      <div className={styles.first_container}>
        <div className={styles.input_container}>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            disabled={isPending}
            defaultValue={state.data?.title}
            name="title"
            placeholder="Senior Frontend Developer"
            className={`inp ${state.error ? (state.error.title ? "invalid" : "valid") : ""}`}
          />{" "}
        </div>{" "}
        <div className={styles.input_container}>
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            disabled={isPending}
            defaultValue={state.data?.organization}
            name="organization"
            placeholder="OOO 'RAI'"
            className={`inp ${state.error ? (state.error.organization ? "invalid" : "valid") : ""}`}
          />{" "}
        </div>
      </div>{" "}
      <div className={styles.first_container}>
        <div className={styles.input_container}>
          <label htmlFor="salary_min">Salary Min</label>
          <input
            disabled={isPending}
            type="number"
            defaultValue={state.data?.salary_min}
            name="salary_min"
            placeholder="50k"
            min={0}
            className={`inp ${state.error ? (state.error.salary_min ? "invalid" : "valid") : ""}`}
          />
        </div>{" "}
        <div className={styles.input_container}>
          <label htmlFor="salary_max">Salary Max</label>
          <input
            type="number"
            name="salary_max"
            defaultValue={state.data?.salary_max}
            placeholder="120k"
            disabled={isPending}
            min={0}
            className={`inp ${state.error ? (state.error.salary_max ? "invalid" : "valid") : ""}`}
          />{" "}
        </div>{" "}
        <div className={styles.input_container}>
          <label htmlFor="emp_type">Emp Type</label>
          <select
            form="create-vacancy-form"
            name="emp_type"
            disabled={isPending}
            className={`inp ${state.error ? (state.error.emp_type ? "invalid" : "valid") : ""}`}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>{" "}
      <div className={styles.input_container}>
        <label htmlFor="description">Description</label>
        <textarea
          disabled={isPending}
          className={`inp ${state.error ? (state.error.description ? "invalid" : "valid") : ""}`}
          name="description"
          defaultValue={state.data?.description}
          placeholder="About job..."
        />
      </div>
      <button className="but-acc">
        {" "}
        {isPending ? <Loader className="spin" size={25} /> : "Create"}
      </button>
    </form>
  );
};
