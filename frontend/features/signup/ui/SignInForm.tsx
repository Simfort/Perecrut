"use client";

import Link from "next/link";
import styles from "./forms.module.css";

import { useActionState, useEffect, useState } from "react";
import { loginUserAction, LoginUserActionState } from "@/entities/recruters";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { useNotificate } from "@/shared/lib/store/useNotificate";
import { useRouter } from "next/navigation";

const initialState: LoginUserActionState = {
  data: {
    password: "",
    email: "",
  },
};

export const SignInForm = () => {
  const [showFlag, setShowFlag] = useState(false);
  const [state, dispatchAction, isPending] = useActionState(
    loginUserAction,
    initialState,
  );
  const router = useRouter();
  const { setData } = useNotificate();

  useEffect(() => {
    console.log(state.success);
    if (state.success) {
      setData({
        status: "success",
        title: "Success",
        description: "Your account is login",
      });
      router.push("/vacancies");
    }
  }, [state.success]);
  return (
    <form action={dispatchAction} className={styles.form}>
      <h3 className={styles.form__title}>Log in your account in Perecrut</h3>
      <p>
        Join thousands of companies that are already optimizing their hiring
        process.
      </p>

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
      <p className="error-text">{state.globalError}</p>
      <button disabled={isPending} type="submit" className="but-prim">
        {isPending ? <Loader className="spin" /> : "Create account"}
      </button>
      <p>
        You have account? <Link href={"/signup"}>Sing up</Link>
      </p>
    </form>
  );
};
