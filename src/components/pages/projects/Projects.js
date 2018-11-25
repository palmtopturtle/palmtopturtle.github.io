import React from "react";
import Planet from "../planet/Planet";
import Tile from "./Tile";
import styles from "./projects.module.scss";
import projectsData from "./ProjectsData.json";

const Projects = () => {
  return (
    <div>
      <Planet page="projects" title="Projects" />
      <div className={styles["content-container"]}>
        <div className={styles["tiles-container"]}>
          {projectsData.map(item => {
            return <Tile project={item} key={item.name} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
