import React from "react";
import styles from "./planet.module.scss"

const Planet = props => {
  return (
    <div className={styles["planet-container"]}>
      <h1 className={styles["page-header"]}>{props.title}</h1>
      <div className={styles["planet-" + props.page]}/>
    </div>
  );
};

export default Planet;
