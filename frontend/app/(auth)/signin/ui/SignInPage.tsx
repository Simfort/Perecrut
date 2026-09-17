import styles from "./SignInPage.module.css";
import { auth } from "@/entities/recruters/server";
import { SignInForm } from "@/features/signin";
import { redirect } from "next/navigation";

export const SignInPage = async () => {
  const authorized = await auth();
  if (authorized) redirect("/vacancies");
  return (
    <div className={styles.page}>
      <SignInForm />
    </div>
  );
};
