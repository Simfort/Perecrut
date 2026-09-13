import { SignInForm } from "@/features/signup/ui/SignInForm";
import styles from "./SignInPage.module.css";
import { auth } from "@/entities/recruters/server";
import { redirect } from "next/navigation";

export const SignInPage = async () => {
  const authorized = await auth();
  if (authorized) redirect("/vacancies");
  return (
    <div className={styles.signinPage}>
      <SignInForm />
    </div>
  );
};
