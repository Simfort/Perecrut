"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { use, useEffect, useState } from "react";
import { authClient } from "@/entities/recruters";

interface PanelProps {
  className: string;
  setOpenFlag?: (arg: boolean) => void;
}

export const Panel = ({ className, setOpenFlag }: PanelProps) => {
  const [authUser, setAuthUser] = useState();

  const handleCloseModal = () => {
    if (setOpenFlag) setOpenFlag(false);
  };
  useEffect(() => {
    const auth = async () => {
      const client = await authClient();
      if (client) {
        setAuthUser(client.data);
      }
    };
    auth();
  }, []);

  if (authUser)
    return (
      <div className={styles[className]}>
        <Link
          onClick={handleCloseModal}
          href={"/vacancies"}
          className={`but-prim ${styles.button_vacancies}`}
        >
          Vacancies
        </Link>
      </div>
    );
  return (
    <div className={styles[className]}>
      <Link onClick={handleCloseModal} href={"/signin"}>
        Sign In
      </Link>{" "}
      <Link onClick={handleCloseModal} href={"/signup"} className="but-prim">
        Get Stareted
      </Link>
    </div>
  );
};
