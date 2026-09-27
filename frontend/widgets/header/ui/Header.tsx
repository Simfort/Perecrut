import Link from "next/link";
import { LINKS } from "../constants/links";
import styles from "./Header.module.css";
import Image from "next/image";
import { BurgerNav } from "./BurgerNav";
import { Panel } from "./Panel";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h5 className={styles.logo_title}>
        <Image
          src={"/logo.png"}
          width={40}
          height={40}
          alt="Interviewly Logo"
        />
        <Link href={"/"}>Interviewly</Link>
      </h5>
      <nav className={styles.nav}>
        {LINKS.map((link) => (
          <Link className={styles.link_nav} key={link.href} href={link.href}>
            {link.title}
          </Link>
        ))}
      </nav>
      <Panel className="panel" />
      <BurgerNav />
    </header>
  );
};
