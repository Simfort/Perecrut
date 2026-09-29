import { useEffect, useState } from "react";
import styles from "./ButtonCopy.module.css";
import { useVacancy } from "@/entities/vacancies";
import { Copy, CopyCheck } from "lucide-react";

export const ButtonCopy = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { vacancy } = useVacancy();
  const linkText = `${process.env.NEXT_PUBLIC_CLIENT_URL}/vacancies/${vacancy?.id}/candidate`;
  const handleCopy = () => {
    navigator.clipboard.writeText(linkText);
    setIsCopied(true);
  };
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isCopied]);
  return (
    <button
      onClick={handleCopy}
      className={`${styles.button} ${isCopied ? styles.copy : ""}`}
    >
      {linkText}
      {isCopied ? <CopyCheck size={20} /> : <Copy size={20} />}
    </button>
  );
};
