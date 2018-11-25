import React from "react";
import Planet from "../planet/Planet";
import styles from "./contact.module.scss";

const Contact = props => {
  return (
    <div>
      <Planet page="contact" title="Contact Me" />
      <div className={styles["content-container"]}>
        <p>...Under Construction!</p>
      </div>
    </div>
  );
};

export default Contact;
