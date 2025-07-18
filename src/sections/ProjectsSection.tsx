import React, { useState } from 'react'
import Project from '../components/Project'
import Button from '../components/Button'
import styles from '../styles/Home.module.css'
import { getProjects } from '../services/projects'

const ProjectsSection = () => {
  const [projects, setProjects] = useState(getProjects(3))
  const [showAllProjects, setShowAllProjects] = useState(false)

  const fetchAllProjects = () => {
    setProjects(getProjects())
    setShowAllProjects(true)
  }

  return (
    <section id="projects" className={styles.section}>
      <h2>Projects</h2>
      <div className={styles.infoProjects}>
        <img
          src="/images/projects.svg"
          alt="Projects"
          className={styles.imageProjects}
          width={635}
          height={300}
        />
        <div>
          <span>
            I like to work on personal projects to improve and learn new
            technologies, usually with
          </span>
          <span className={styles.important}> Vue.js</span>,
          <span className={styles.important}> React Native </span>and
          <span className={styles.important}> NodeJS</span>
          <p>
            <span>All powered by </span>
            <span className={styles.important}> TypeScript ✨</span>
          </p>
        </div>
      </div>
      <div className={styles.projects}>
        {projects.map(project => (
          <Project
            key={project.id}
            name={project.name}
            description={project.description}
            image={project.image}
            links={project.links}
            apps={project.apps}
          />
        ))}
      </div>
      {!showAllProjects && <Button onClick={fetchAllProjects}>Show All</Button>}
    </section>
  )
}

export default ProjectsSection
