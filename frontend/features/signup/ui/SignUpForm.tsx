"use client";

import Link from "next/link";
import styles from "./forms.module.css";
import { PasswordContainer } from "./PasswordContainer";
import { useActionState, useEffect } from "react";
import { createUserAction, RecrutersFields } from "@/entities/recruters";
import { Loader, Mail, User } from "lucide-react";
import { useNotificate } from "@/shared/lib/store/useNotificate";
import { useRouter } from "next/navigation";
import { parseErrorToStr } from "@/shared/utils/parseErrorToStr";

export const SignUpForm = () => {
  const [state, dispatchAction, isPending] = useActionState(createUserAction, {
    data: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      confrimPassword: "",
    },
  });
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
    } else if (state.error) {
      setData({
        status: "error",
        title: "Error Valid Fields",
        description: parseErrorToStr(state),
      });
    }
  }, [state]);
  return (
    <form action={dispatchAction} className={styles.form}>
      <h3 className={styles.form__title}>Create your account in Perecrut</h3>
      <p>
        Join thousands of companies that are already optimizing their hiring
        process.
      </p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputsContainer__fullname}>
          <label htmlFor="firstname">Firstname</label>{" "}
          <div className={styles.logo_container}>
            <User size={20} className={styles.logo} />
            <input
              autoCapitalize="on"
              defaultValue={state.data.firstname}
              type="text"
              className={`inp ${state.error ? (state.error.firstname ? "invalid" : "valid") : ""} ${styles.form_input}`}
              name="firstname"
              onChange={handleChange}
              disabled={isPending}
              placeholder="Firstname"
            />{" "}
          </div>
        </div>
        <div className={styles.inputsContainer__fullname}>
          <label htmlFor="lastname">Lastname</label>{" "}
          <input
            type="text"
            className={`inp ${state.error ? (state.error.lastname ? "invalid" : "valid") : ""} `}
            name="lastname"
            defaultValue={state.data.lastname}
            placeholder="Lastname"
            onChange={handleChange}
            disabled={isPending}
          />{" "}
        </div>
      </div>
      <div className={styles.inputsContainer__fullname}>
        <label htmlFor="email">Email</label>
        <div className={styles.logo_container}>
          <Mail size={20} className={styles.logo} />
          <input
            type="text"
            name="email"
            className={`inp ${state.error ? (state.error.email ? "invalid" : "valid") : ""} ${styles.form_input}`}
            defaultValue={state.data.email}
            placeholder="example@recrut.com"
            disabled={isPending}
          />
        </div>
      </div>
      <PasswordContainer state={state} />
      <p className="error-text">{state.globalError}</p>
      <button disabled={isPending} type="submit" className="but-acc">
        {isPending ? <Loader className="spin" size={25} /> : "Create account"}
      </button>
      <p>
        You have account?{" "}
        <Link className={styles.link} href={"/signin"}>
          Sing in
        </Link>
      </p>
    </form>
  );
};
