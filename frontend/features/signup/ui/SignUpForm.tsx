import Link from "next/link";
import styles from "./SingUpForm.module.css";
import { PasswordContainer } from "./PasswordContainer";

export const SignUpForm = () => {
  return (
    <form className={styles.form}>
      <h3 className={styles.form__title}>Create your account in Perecrut</h3>
      <p>
        Join thousands of companies that are already optimizing their hiring
        process.
      </p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputsContainer__fullname}>
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            className="inp"
            name="firstname"
            placeholder="Firstname"
          />
        </div>
        <div className={styles.inputsContainer__fullname}>
          <label htmlFor="firstname">Lastname</label>
          <input
            type="text"
            className="inp"
            name="lastname"
            placeholder="Lastname"
          />
        </div>
      </div>
      <div className={styles.inputsContainer__fullname}>
        <label htmlFor="firstname">Email</label>
        <input
          type="text"
          name="email"
          className="inp"
          placeholder="example@recrut.com"
        />
      </div>
      <PasswordContainer />
      <button className="but-prim">Create account</button>
      <p>
        You have account? <Link href={"/signin"}>Sing in</Link>
      </p>
    </form>
  );
};
