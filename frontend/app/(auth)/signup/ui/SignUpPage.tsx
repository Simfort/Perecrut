import { SignUpForm } from "@/features/signup";
import styles from "./SignUpPage.module.css";
import { redirect } from "next/navigation";
import { auth } from "@/entities/recruters/server";

export const SignUpPage = async () => {
  const authorized = await auth();
  if (authorized) redirect("/vacancies");
  return (
    <div className={styles.signupPage}>
      <SignUpForm />
    </div>
  );
};
