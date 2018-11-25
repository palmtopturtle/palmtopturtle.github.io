import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navtop.module.scss";

const NavTop = () => {
  return (
    <nav>
      <ul className={styles["nav-container"]}>
        <li>
          <NavLink
            exact
            to="/"
            className={styles["nav-home"]}
            activeStyle={{ color: "#8200F4" }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resume"
            className={styles["nav-resume"]}
            activeStyle={{ color: "#00943A" }}
          >
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={styles["nav-projects"]}
            activeStyle={{ color: "#B52A23" }}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={styles["nav-contact"]}
            activeStyle={{ color: "#2EA3FF" }}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavTop;
