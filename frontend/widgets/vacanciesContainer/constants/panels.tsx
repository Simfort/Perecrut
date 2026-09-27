import { Notebook, Settings, Users } from "lucide-react";

export const PANELS = [
  { title: "Job Postings", logo: <Notebook /> },
  { title: "Candidates", logo: <Users /> },
  { title: "Settings", logo: <Settings /> },
] as const;
