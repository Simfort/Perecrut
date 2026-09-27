import styles from "./LoadingPage.module.css";

export const LoadingPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.loading_container}>
        {new Array(4).map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};
