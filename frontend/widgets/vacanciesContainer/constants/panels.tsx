import { Notebook, Users } from "lucide-react";

export const PANELS = [
  { title: "Job Postings", logo: <Notebook /> },
  { title: "Candidates", logo: <Users /> },
] as const;
