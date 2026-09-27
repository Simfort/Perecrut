"use client";

import { useEffect } from "react";
import { useNotificate } from "../lib/store/useNotificate";
import styles from "./Notificate.module.css";

export const Notificate = () => {
  const { data, setData } = useNotificate();
  useEffect(() => {
    let interval = null;
    if (data) {
      interval = setTimeout(() => {
        setData(null);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [data?.description, data?.status, data?.title]);
  if (data)
    return (
      <div aria-live="assertive" aria-modal className={styles.container}>
        <div className={`${styles.notificate} ${styles[data.status]}`}>
          <div>
            <h5 className={styles.title}>{data.title}</h5>
            <h6 className={styles.description}>{data.description}</h6>
          </div>
        </div>
      </div>
    );
  return null;
};
