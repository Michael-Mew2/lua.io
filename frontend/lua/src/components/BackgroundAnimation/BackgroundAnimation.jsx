import * as React from 'react'
import styles from './BackgroundAnimation.module.css'

export default function BackgroundAnimation(favoriteColor) {

  const favoriteColorGradients = {
    red:["#8a2387", "#e94057", "#f27121"],
    green:["#00f260", "#0575e6", "#081b2c"],
    blue:["#5433ff", "#20bdff", "#aba5fe"],
    orange:["#1a2a6c", "#b21f1f", "#fdbb2d"],
    pink:["#03001e", "#7303c0", "#ec38bc"]
  }

  return (
    <div className={styles.background}>
          <b></b>
          <b className={styles.span-2}></b>
          <b className={styles.span-3}></b>
          <b className={styles.span-4}></b>
          <b className={styles.span - 5}></b>
          <b className={styles.span - 4}></b>
          <b className={styles.span - 3}></b>
          <b className={styles.span - 2}></b>
          <b></b>
          <b className={styles.span - 2}></b>
          <b className={styles.span - 3}></b>
          <b className={styles.span - 4}></b>
          <b className={styles.span - 5}></b>
          <b className={styles.span - 4}></b>
          <b className={styles.span - 3}></b>
          <b className={styles.span - 2}></b>
          <b></b>
    </div>
  )
}
