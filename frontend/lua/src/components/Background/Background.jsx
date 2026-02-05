import * as React from "react";
import styles from "./Background.module.css";
import { AuthContext } from "../../contextx/AuthContext";

export default function Background() {
  const { user } = React.useContext(AuthContext);

  const favoriteColorGradients = {
    default: ["#feac5e", "#c779d0", "#4bc0c8"],
    "#FF5733": ["#8a2387", "#e94057", "#f27121"],
    "#33FF57": ["#00f260", "#0575e6", "#081b2c"],
    "#3357FF": ["#5433ff", "#20bdff", "#aba5fe"],
    "#f08716": ["#1a2a6c", "#b21f1f", "#fdbb2d"],
    "#FF33F3": ["#03001e", "#7303c0", "#ec38bc"],
  };

  const backgroundColors =
    favoriteColorGradients[user?.color] || favoriteColorGradients.default;

  return (
    <div className={styles.background} style={{"--color1": backgroundColors[0], "--color2": backgroundColors[1], "--color3": backgroundColors[2]}}>
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
