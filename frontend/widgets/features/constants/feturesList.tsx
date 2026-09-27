import {
  Calendar,
  ChartNoAxesCombined,
  Group,
  Mail,
  Save,
  Shield,
  Zap,
} from "lucide-react";

export const FEATURES_LIST = [
  {
    logo: <Calendar size={35} />,
    title: "Easy Scheduling",
    description:
      "Let candidates choose their preferred time slots with just a few clicks.",
  },
  {
    logo: <Mail size={35} />,
    title: "Automated Reminders",
    description: "Reduce no-shows with email and calendar invites.",
  },
  {
    logo: <Group size={35} />,
    title: "Team Collaboration",
    description: "Keep your hiring team aligned and informed.",
  },
  {
    logo: <Shield size={35} />,
    title: "Secure & Reliable",
    description: "Your data is always protected and private.",
  },
  {
    logo: <Zap size={35} />,
    title: "Save Time",
    description: "Automate repetitive tasks and focus on what matters most.",
  },
  {
    logo: <ChartNoAxesCombined size={35} />,
    title: "Better Hires",
    description: "Make data-driven decisions and build stronger teams.",
  },
];
