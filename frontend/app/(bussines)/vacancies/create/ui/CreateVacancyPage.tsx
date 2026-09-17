import { redirect } from "next/navigation";
import styles from "./CreateVacancyPage.module.css";
import { auth } from "@/entities/recruters/server";
import { CreateVacancyForm } from "@/features/createVacancy";

export const CreateVacancyPage = async () => {
  const authorized = await auth();
  if (!authorized) redirect("/signup");
  return (
    <div className={styles.page}>
      <h1>Create</h1>
      <CreateVacancyForm />
    </div>
  );
};
