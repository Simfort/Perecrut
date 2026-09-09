import { SignInForm } from "@/features/signup/ui/SignInForm";
import styles from "./SignInPage.module.css";

export const SignInPage = () => {
  return (
    <div className={styles.signinPage}>
      <SignInForm />
    </div>
  );
};
