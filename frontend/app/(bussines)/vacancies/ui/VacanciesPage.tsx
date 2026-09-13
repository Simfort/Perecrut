import { auth } from "@/entities/recruters/server";
import { redirect } from "next/navigation";

export const VacanciesPage = async () => {
  const authorized = await auth();
  if (!authorized) redirect("/signup");
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};
