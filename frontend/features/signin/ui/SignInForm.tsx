"use client";

import Link from "next/link";
import styles from "./forms.module.css";

import { useActionState, useEffect, useState } from "react";
import { loginUserAction } from "@/entities/recruters";
import { Eye, EyeClosed, Loader, Lock, Mail } from "lucide-react";
import { useNotificate } from "@/shared/lib/store/useNotificate";
import { useRouter } from "next/navigation";
import { parseErrorToStr } from "@/shared/utils/parseErrorToStr";

export const SignInForm = () => {
  const [showFlag, setShowFlag] = useState(false);
  const [state, dispatchAction, isPending] = useActionState(loginUserAction, {
    data: {
      password: "",
      email: "",
    },
  });
  const router = useRouter();
  const { setData } = useNotificate();

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
    <form action={dispatchAction} className={styles.form}>
      <h3 className={styles.form__title}>Log in your account</h3>
      <p className={styles.form__description}>
        Join thousands of companies that are already optimizing their hiring
        process.
      </p>

      <div className={styles.inputsContainer__fullname}>
        <label htmlFor="email">Email</label>
        <div className={styles.mailContainer}>
          <Mail size={20} className={styles.mail} />{" "}
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

      <label className={styles.label_password} htmlFor="firstname">
        Password
      </label>
      <div className={styles.container_rightPassword}>
        <Lock size={20} className={styles.lock} />
        <input
          defaultValue={state.data.password}
          type={showFlag ? "text" : "password"}
          className={`inp ${state.error ? (state.error.password ? "invalid" : "valid") : ""} ${styles.form_input}`}
          name="password"
          placeholder="Password"
          disabled={isPending}
        />
        <button
          type="button"
          onClick={() => setShowFlag(!showFlag)}
          className={styles.container_showPassword}
          aria-label="Show password"
        >
          {showFlag ? <EyeClosed /> : <Eye />}
        </button>
      </div>
      <p className="error-text">{state.globalError}</p>
      <button disabled={isPending} type="submit" className="but-acc">
        {isPending ? <Loader className="spin" size={25} /> : "Create account"}
      </button>
      <p>
        You have account?{" "}
        <Link className={styles.link} href={"/signup"}>
          Sing up
        </Link>
      </p>
    </form>
  );
};
