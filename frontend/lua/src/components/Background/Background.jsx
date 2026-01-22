import * as React from "react";
import styles from "./Background.module.css";

export default function Background() {
  return (
    <div className={styles.background}>
      <b></b>
      <b className={styles["span-2"]}></b>
      <b className={styles["span-3"]}></b>
      <b className={styles["span-4"]}></b>
      <b className={styles["span-5"]}></b>
      <b className={styles["span-4"]}></b>
      <b className={styles["span-3"]}></b>
      <b className={styles["span-2"]}></b>
      <b></b>
      <b className={styles["span-2"]}></b>
      <b className={styles["span-3"]}></b>
      <b className={styles["span-4"]}></b>
      <b className={styles["span-5"]}></b>
      <b className={styles["span-4"]}></b>
      <b className={styles["span-3"]}></b>
      <b className={styles["span-2"]}></b>
      <b></b>
    </div>
  );
}
