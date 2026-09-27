"use client";
import { Menu, X } from "lucide-react";
import { LINKS } from "../constants/links";
import styles from "./Header.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Panel } from "./Panel";

export const BurgerNav = () => {
  const [openFlag, setOpenFlag] = useState(false);
  return (
    <div className={styles.burger}>
      <button
        className={styles.burger_button}
        onClick={() => setOpenFlag(!openFlag)}
      >
        {openFlag ? <X /> : <Menu />}
      </button>
      {openFlag && (
        <aside className={styles.burger_aside}>
          {" "}
          <h5 className={styles.logo_title}>
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              alt="Interviewly Logo"
            />
            Interviewly
          </h5>
          <nav className={styles.burger_nav}>
            {LINKS.map((link) => (
              <Link
                onClick={() => setOpenFlag(false)}
                className={styles.burger_link}
                key={link.href}
                href={link.href}
              >
                {link.logo}
                {link.title}
              </Link>
            ))}{" "}
            <Panel className="burger_panel" />
          </nav>
        </aside>
      )}
    </div>
  );
};
