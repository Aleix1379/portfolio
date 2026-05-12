import React, { type CSSProperties, useState } from 'react'
import Project from '../components/Project'
import Button from '../components/Button'
import useReveal from '../hooks/useReveal.ts'
import styles from '../styles/Home.module.css'
import { getProjects } from '../services/projects'

const ProjectsSection = () => {
  const allProjects = getProjects()
  const [projects, setProjects] = useState(getProjects(3))
  const [showAllProjects, setShowAllProjects] = useState(false)
  const sectionRef = useReveal<HTMLElement>()
  const revealDelay = (delay: number): CSSProperties =>
    ({ '--reveal-delay': `${delay}ms` }) as CSSProperties

  const fetchAllProjects = () => {
    setProjects(getProjects())
    setShowAllProjects(true)
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`${styles.section} ${styles.projectsSection}`}
    >
      <div className={styles.projectsIntro}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow} data-reveal style={revealDelay(0)}>
            SELECTED WORK
          </span>
          <h2 data-reveal style={revealDelay(90)}>
            Projects
          </h2>
          <p
            className={styles.sectionLead}
            data-reveal
            style={revealDelay(180)}
          >
            Personal projects to improve and learn new technologies, usually
            with
            <span className={styles.important}> Vue.js</span>,
            <span className={styles.important}> React Native </span>and
            <span className={styles.important}> NodeJS</span>, all powered by
            <span className={styles.important}> TypeScript</span>.
          </p>
        </div>
      </div>

      <div className={styles.projects} aria-label="Featured projects">
        {projects.map((project, index) => (
          <Project
            key={project.id}
            name={project.name}
            description={project.description}
            image={project.image}
            links={project.links}
            apps={project.apps}
            style={revealDelay(320 + index * 90)}
          />
        ))}
      </div>
      {!showAllProjects && projects.length < allProjects.length && (
        <div className={styles.showMore}>
          <Button onClick={fetchAllProjects} className={styles.sectionButton}>
            Show all
          </Button>
        </div>
      )}
    </section>
  )
}

export default ProjectsSection
