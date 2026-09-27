import Image from "next/image";
import { BLOCKS } from "../constants/blocks";
import Link from "next/link";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_main}>
        <div className={styles.main_info}>
          <h3 className={styles.info_title}>
            <Image
              src={"/logo.png"}
              alt="Interviewly logo"
              width={50}
              height={50}
            />{" "}
            Interviewly
          </h3>
          <p className={styles.info_description}>
            Practice smarter. Interview with confidence. Build your future.
          </p>
        </div>
        {BLOCKS.map((block, index) => (
          <div className={styles.block} key={index}>
            <h6 className={styles.block_title}>{block.title}</h6>
            {block.links.map((link, indexLink) => (
              <Link
                className={styles.block_link}
                href={link.href}
                key={indexLink}
              >
                {link.title}
              </Link>
            ))}
          </div>
        ))}{" "}
        <div className={styles.email_block}>
          <h6 className={styles.block_title}>STAY IN THE LOOP</h6>
          <p className={styles.email_description}>
            Get the latest tips, features and career advice straight to your
            inbox.
          </p>
        </div>
      </div>
      <div className={styles.under}>
        {" "}
        <div className={styles.under_container}>
          <div aria-hidden className={styles.decor_line} />
          <div className={styles.under_info}>
            <p>© 2025 Interviewly. All rights reserved.</p>
            <p>Better interviews. Brighter futures.</p>
          </div>{" "}
        </div>{" "}
        <Image
          width={300}
          height={300}
          src={"/footer.png"}
          alt="Footer decorate elementr"
          className={styles.decor}
          aria-hidden
        ></Image>{" "}
      </div>
    </footer>
  );
};
