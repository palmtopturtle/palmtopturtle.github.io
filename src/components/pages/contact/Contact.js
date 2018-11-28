import React from "react";
import Planet from "../planet/Planet";
import styles from "./contact.module.scss";

const Contact = props => {
  return (
    <div>
      <Planet page="contact" title="Contact Me" />
      <div className={styles["content-container"]}>
        <p>
          Thank you for taking the time to look at my website! If you would like
          to contact me, LinkedIn is probably the easiest way. I always try to
          respond as quickly as possible.
        </p>

        <div className={styles["btn-container"]}>
          <a
            className={styles["btn-linkedin"]}
            href="https://www.linkedin.com/in/jeff-g-7b6ba1164/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className={styles["btn-github"]}
            href="https://github.com/palmtopturtle"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
