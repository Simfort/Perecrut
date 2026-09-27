"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { use, useEffect, useState } from "react";
import { authClient } from "@/entities/recruters";

interface PanelProps {
  className: string;
}

export const Panel = ({ className }: PanelProps) => {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    authClient().then((authUser) => {
      if (authUser) {
        setAuthUser(authUser.data);
      }
    });
  }, []);
  console.log(authUser);
  if (authUser)
    return (
      <Link
        href={"/vacancies"}
        className={`but-prim ${styles.button_vacancies}`}
      >
        Vacancies
      </Link>
    );
  return (
    <div className={styles[className]}>
      <Link href={"/signin"}>Sign In</Link>{" "}
      <Link href={"/signup"} className="but-prim">
        Get Stareted
      </Link>
    </div>
  );
};
