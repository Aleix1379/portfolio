import React from 'react'
import Project from '../components/Project'
import styles from '../styles/ProjectsSection.module.css'
import { getProjects } from '../services/projects'

const ProjectsSection = () => {
  const projects = getProjects()

  return (
    <section
      id="projects"
      className="portfolio-section"
      aria-labelledby="projects-title"
      tabIndex={-1}
    >
      <div className="content-container">
        <div className={styles.heading}>
          <h2 id="projects-title">Selected projects</h2>
          <p>
            Web and mobile products I've built, connecting interfaces, backend
            services and deployment.
          </p>
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
              preview={project.preview}
              contribution={project.contribution}
              featuredTechnologies={project.featuredTechnologies}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
