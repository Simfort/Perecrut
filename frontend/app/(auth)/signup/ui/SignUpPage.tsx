import { SignUpForm } from "@/features/signup";
import styles from "./SignUpPage.module.css";

export const SignUpPage = () => {
  return (
    <div className={styles.signupPage}>
      <SignUpForm />
    </div>
  );
};
