import React from "react";
import Planet from "../planet/Planet";
import Accordion from "./Accordion";
import styles from "./resume.module.scss";

const Resume = () => {
  return (
    <div>
      <Planet page="resume" title="Resume" />
      <div className={styles["content-container"]}>
        <Accordion header="Education">
          <h3>Ohio State University</h3>
          <ul>
            <li>Graduated May 2018</li>
            <li>Major: Communication Technology</li>
            <li>
              Took classes about coding fundamentals, Java, web design,
              technology best practices in business, and more.
            </li>
          </ul>
        </Accordion>
        <Accordion header="Work Experience">
          <h3>
            DYODE -{" "}
            <span className={styles["job-title"]}>Front End Developer</span>
          </h3>
          <ul>
            <li>
              Audited and optimized website performance and accessibility, with quantifiable results and significant improvements in speed, SEO, and accessibility scores.
            </li>
            <li>
              Handling both project and retainer work, providing accurate estimates and translating requirements into actionable tasks. With retainer work, I proactively fix bugs and integrate new features into existing sites’ ecosystems; whereas doing project work I’m able to create clear and concise outlines that I then turn into efficient and maintainable code.
            </li>
            <li>
              Exposure to a lot of different parts of website development - ranging from backend discount scripts in Ruby to interactive carousels in JavaScript. 
            </li>
            <li>
              Effective at asynchronous programming, often sending and consuming data from various API endpoints.
            </li>
          </ul>
          <h3>
            BVA -{" "}
            <span className={styles["job-title"]}>Front End Developer</span>
          </h3>
          <ul>
            <li>
            Developed and maintained storefront themes and admin interfaces for Shopify Plus clients, increasing conversion rates for them.
            </li>
            <li>
              Built and implemented interactive page layouts (homepage, account, PDP, cart, checkout, etc.) using mock-ups from the design team.
            </li>
            <li>
              Integrated third-party solutions for tracking, segmentation, and remarketing. Able to work with and learn new APIs.
            </li>
            <li>
              Worked across multiple projects at a time, each with their own team of managers, designers, and developers. Helped with the creation of a new build tool using Vue to optimize new themes and reduce dev time.
            </li>
            <li>
              Notable projects I worked on: UpWest, Ketologic, NOBULL, Chubbies Shorts, Porter Road, Rebecca Minkoff, Frida Baby, JNY
            </li>
          </ul>
        </Accordion>
        <Accordion header="Skills">
          <h3>Coding</h3>
          <ul>
            <li>HTML, CSS</li>
            <li>JavaScript</li>
            <li>React, Vue</li>
            <li>Typescript</li>
            <li>Node.js</li>
            <li>Liquid, Shopify</li>
          </ul>
          <h3>General Computer Skills</h3>
          <ul>
            <li>Office suites (Microsoft, Google)</li>
            <li>Adobe Creative Suite</li>
            <li>PC troubleshooting and repair</li>
            <li>Basic network administration</li>
          </ul>
        </Accordion>
      </div>
    </div>
  );
};

export default Resume;
