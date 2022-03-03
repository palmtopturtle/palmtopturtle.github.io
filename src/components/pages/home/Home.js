import React from "react";
import Planet from "../planet/Planet";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div>
      <Planet page="home" title="About Me" />
      <div className={styles["content-container"]}>
        <p>
          My name is Jeff, and I graduated in 2018 from Ohio State University
          with a degree in communication technology and have proven experience as a front-end developer. I'm familiar with HTML,
          CSS, and Javascript, and am always learning more. Aside from
          technology, I enjoy gardening, coffee, and walking whenever possible!
        </p>
      </div>
    </div>
  );
};

export default Home;
