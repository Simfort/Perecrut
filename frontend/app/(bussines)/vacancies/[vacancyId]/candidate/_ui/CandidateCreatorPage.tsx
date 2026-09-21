import styles from "./CandidateCreatorPage.module.css";
import { getVacancy } from "@/entities/vacancies/server";
import { redirect } from "next/navigation";
import { CandidateContainer } from "@/widgets/candidateContainer";

interface CandidateCreatorPageProps {
  vacancyId: string;
}

export const CandidateCreatorPage = async ({
  vacancyId,
}: CandidateCreatorPageProps) => {
  const vacancy = await getVacancy(vacancyId);
  if (!vacancy) redirect("/");
  return (
    <div className={styles.page}>
      <h2>Candidate Creator</h2>
      <CandidateContainer vacancyData={vacancy} />
    </div>
  );
};
