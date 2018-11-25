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
          <h3>Dublin Jerome High School</h3>
          <ul>
            <li>Graduated May 2014</li>
          </ul>
        </Accordion>
        <Accordion header="Work Experience">
          <h3>
            Robintek -{" "}
            <span className={styles["job-title"]}>Web Designer Internship</span>
          </h3>
          <ul>
            <li>
              Designed website and logo prototypes for several local and
              national businesses, including CarePlans, Delta H, and
              SafeBasements of Ohio.
            </li>
            <li>
              Developed custom HTML, CSS, and JavaScript as outlined in client
              prototypes while also utilizing Robintek’s own content management
              system.
            </li>
            <li>
              Worked both collaboratively in a team environment and individually
              on various projects that involved server maintenance, updating
              existing code, and overall ensuring that clients' needs were met.
            </li>
          </ul>
          <h3>
            Staples -{" "}
            <span className={styles["job-title"]}>
              Technology Sales Associate
            </span>
          </h3>
          <ul>
            <li>
              Provided personalized technical support to customers and sold
              products ranging from laptops to printers.
            </li>
            <li>
              Utilized Windows PowerShell to automate some tasks (e.g. scanning
              for malware).
            </li>
          </ul>
        </Accordion>
        <Accordion header="Skills">
          <h3>General Computer Skills</h3>
          <ul>
            <li>Microsoft Office</li>
            <li>Adobe Creative Suite</li>
            <li>PC troubleshooting and repair</li>
            <li>Basic network administration</li>
            <li>Social media analytics</li>
          </ul>
          <h3>Coding</h3>
          <ul>
            <li>HTML, CSS, SASS/SCSS</li>
            <li>JavaScript, React.js, Node.js</li>
            <li>Databases (SQL, Redis)</li>
            <li>
              Solid grasp of coding fundamentals (object-orientated, etc.)
            </li>
          </ul>
        </Accordion>
      </div>
    </div>
  );
};

export default Resume;
