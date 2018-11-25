import React from "react";
import styles from "./tile.module.scss";

const Tile = props => {
  return (
    <div className={styles.tile}>
      <h3>{props.project.name}</h3>
      <p>{props.project.description}</p>
      <div className={styles["btn-container"]}>
        {props.project.buttons.map(item => {
          return (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
              key={item.name}
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Tile;
