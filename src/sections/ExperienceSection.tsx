import React, { useState } from "react";
import Experience from "../components/Experience";
import ExperienceSeparator from "../components/ExperienceSeparator";
import Button from "../components/Button";
import styles from "../styles/Home.module.css";
import { getExperience } from "../services/experience.ts";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState(getExperience(3));
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const fetchAllExperiences = () => {
    setExperiences(getExperience());
    setShowAllExperiences(true);
  };
  return (
    <section id="experience" className={styles.section}>
      <h2>Experience</h2>
      <img
        src="/images/experience.svg"
        alt="Experience"
        className={styles.image}
        width={300}
        height={300}
      />
      <div className={styles.infoExperience}>
        {experiences.map((experience, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <Experience experience={experience} />
            {index < experiences.length - 1 && <ExperienceSeparator />}
          </div>
        ))}
      </div>

      {!showAllExperiences && (
        <Button onClick={fetchAllExperiences}>Show all</Button>
      )}
    </section>
  );
};

export default ExperienceSection;
