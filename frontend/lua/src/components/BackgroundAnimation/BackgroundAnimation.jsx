import * as React from "react";
import styles from "./BackgroundAnimation.module.css";

export default function BackgroundAnimation({favoriteColor}) {
  console.log("Empfangene Lieblingsfarbe in BackgroundAnimation:", favoriteColor);

  const favoriteColorGradients = {
    default: ["#feac5e", "#c779d0", "#4bc0c8"],
    "#FF5733": ["#8a2387", "#e94057", "#f27121"],
    "#33FF57": ["#00f260", "#0575e6", "#081b2c"],
    "#3357FF": ["#5433ff", "#20bdff", "#aba5fe"],
    "#f08716": ["#1a2a6c", "#b21f1f", "#fdbb2d"],
    "#FF33F3": ["#03001e", "#7303c0", "#ec38bc"],
  };

  const colors =
    favoriteColorGradients[favoriteColor] || favoriteColorGradients.default;

  return (
    <div className={styles.background} style={{"--color1": colors[0], "--color2": colors[1], "--color3": colors[2]}}>
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
