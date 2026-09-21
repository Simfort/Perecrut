import { CandidateCreatorPage } from "./_ui/CandidateCreatorPage";

export default async function Page({
  params,
}: PageProps<"/vacancies/[vacancyId]/candidate">) {
  const vacancyId = (await params).vacancyId;
  return <CandidateCreatorPage vacancyId={vacancyId} />;
}
