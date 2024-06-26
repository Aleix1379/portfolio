import React from "react";
import styles from "../styles/Experience.module.css";
import type { JobExperience } from "../types/JobExperience";
import Chip from "./Chip";
import { formatDateWithMonthName, getDifference } from "../utils/time";

interface ExperienceProps {
  experience: JobExperience;
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <div className={styles.experience}>
      <div className={styles.header}>
        <div>
          <h2>{experience.title}</h2>
          <span className={styles.company}>{experience.company}</span>
        </div>

        <div className={styles.info}>
          <div className={styles.infoDetails}>
            <span className={styles.location}>{experience.location}</span>
            <span className={styles.jobType}>{experience.type}</span>
          </div>

          <div className={styles.time}>
            <span className={styles.timeCapitalize}>
              {formatDateWithMonthName(experience.start, {
                month: true,
                year: true,
                short: true,
              })}
            </span>
            <span> - </span>
            {experience.end ? (
              <span className={styles.timeCapitalize}>
                {" "}
                {formatDateWithMonthName(experience.end, {
                  month: true,
                  year: true,
                  short: true,
                })}
              </span>
            ) : (
              <span className={styles.timeCapitalize}> present</span>
            )}
            <span className={styles.duration}>
              {" "}
              {getDifference(experience.start, experience.end)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div>
          {experience.technologies.map((technology, index) => (
            <Chip key={index} className={styles.technology}>
              {technology}
            </Chip>
          ))}
        </div>
      </div>
      <ul className={styles.responsibilities}>
        {experience.responsibilities.map((word, index) => (
          <li key={index}>
            <p className={styles.description}>{word}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
