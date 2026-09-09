"use client";

import Link from "next/link";
import styles from "./forms.module.css";
import { PasswordContainer } from "./PasswordContainer";
import { useActionState, useEffect } from "react";
import { createUserAction } from "@/entities/recruters";
import { CreateUserActionState } from "@/entities/recruters/api/createUserAction";
import { Loader } from "lucide-react";
import { useNotificate } from "@/shared/lib/store/useNotificate";
import { useRouter } from "next/navigation";

const initialState: CreateUserActionState = {
  data: {
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    confrimPassword: "",
  },
};

export const SignUpForm = () => {
  const [state, dispatchAction, isPending] = useActionState(
    createUserAction,
    initialState,
  );
  const { setData } = useNotificate();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return;
    const upChar = e.target.value[0].toUpperCase();

    e.target.value = upChar + e.target.value.slice(1);
  }
  useEffect(() => {
    console.log(state.success);
    if (state.success) {
      setData({
        status: "success",
        title: "Success",
        description: "Your account is created",
      });
      router.push("/vacancies");
    }
  }, [state.success]);
  return (
    <form action={dispatchAction} className={styles.form}>
      <h3 className={styles.form__title}>Create your account in Perecrut</h3>
      <p>
        Join thousands of companies that are already optimizing their hiring
        process.
      </p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputsContainer__fullname}>
          <label htmlFor="firstname">Firstname</label>
          <input
            autoCapitalize="on"
            defaultValue={state.data.firstname}
            type="text"
            className={`inp ${state.error ? (state.error.firstname ? "invalid" : "valid") : ""}`}
            name="firstname"
            onChange={handleChange}
            placeholder="Firstname"
          />
        </div>
        <div className={styles.inputsContainer__fullname}>
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            className={`inp ${state.error ? (state.error.lastname ? "invalid" : "valid") : ""}`}
            name="lastname"
            defaultValue={state.data.lastname}
            placeholder="Lastname"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.inputsContainer__fullname}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          className={`inp ${state.error ? (state.error.email ? "invalid" : "valid") : ""}`}
          defaultValue={state.data.email}
          placeholder="example@recrut.com"
        />
      </div>
      <PasswordContainer state={state} />
      <p className="error-text">{state.globalError}</p>
      <button disabled={isPending} type="submit" className="but-prim">
        {isPending ? <Loader className="spin" /> : "Create account"}
      </button>
      <p>
        You have account? <Link href={"/signin"}>Sing in</Link>
      </p>
    </form>
  );
};
