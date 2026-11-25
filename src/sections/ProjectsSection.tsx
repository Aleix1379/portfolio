import React, { useEffect, useRef, useState } from 'react'
import Project from '../components/Project'
import ProjectPoster from '../components/ProjectPoster'
import { useCardTilt } from '../hooks/useCardTilt'
import styles from '../styles/ProjectsSection.module.css'
import { getProjects } from '../services/projects'

const projects = getProjects()

export default function ProjectsSection() {
  const tilt = useCardTilt()
  const [active, setActive] = useState(
    projects.find(project => project.poster?.motif === 'dial')?.id ??
      projects[0]?.id
  )
  useEffect(() => {
    // A keyboard user can reach the server-rendered index before hydration.
    const focusedRow = document.activeElement?.closest<HTMLElement>('[data-project-row]')
    if (focusedRow?.dataset.projectRow) setActive(focusedRow.dataset.projectRow)
  }, [])
  const activePoster = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const poster = activePoster.current
    const row = poster?.parentElement
    const list = row?.parentElement
    const trigger = row?.querySelector('summary')
    const nav = document.querySelector('nav')
    if (!poster || !row || !list || !trigger || !nav) return

    const desktop = window.matchMedia('(min-width: 761px)')
    let frame = 0
    const positionPoster = () => {
      frame = 0
      if (!desktop.matches) return
      // Leave room for the corners of the rotated and tilted poster.
      const halfHeight = poster.offsetHeight / 2 + poster.offsetWidth * 0.08 + 8
      const minimum = nav.getBoundingClientRect().bottom + halfHeight
      const maximum = Math.min(window.innerHeight, list.getBoundingClientRect().bottom) - halfHeight
      const rowTop = row.getBoundingClientRect().top
      const ideal = rowTop + trigger.offsetHeight * 0.33
      const center = Math.min(maximum, Math.max(minimum, ideal))
      poster.style.setProperty('--poster-center', (center - rowTop) + 'px')
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(positionPoster)
    }
    positionPoster()
    const observer = new ResizeObserver(schedule)
    observer.observe(list)
    observer.observe(nav)
    observer.observe(poster)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
      poster.style.removeProperty('--poster-center')
    }
  }, [active])
  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-title"
      tabIndex={-1}
    >
      <h1 id="projects-title">Selected projects</h1>
      <div className={styles.index} {...tilt}>
        {projects.map(project => (
          <div
            key={project.id}
            className={styles.row}
            data-project-row={project.id}
            data-active={active === project.id}
            onPointerEnter={event => {
              if (event.pointerType === 'mouse') setActive(project.id)
            }}
            onFocusCapture={() => setActive(project.id)}
          >
            <details className={styles.entry}>
              <summary
                className={styles.trigger}
                onClick={() => setActive(project.id)}
              >
                <span className={styles.nameBox}>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                  <span
                    className={styles.name}
                    style={{
                      fontSize: `min(var(--display-size), ${230 / Math.max(8, project.name.length)}cqw)`
                    }}
                  >
                    {project.name}
                  </span>
                </span>
                <span className={styles.category}>
                  {project.category || 'Web & mobile'}
                </span>
              </summary>
              <div className={styles.body}>
                <Project {...project} embedded>
                  <div className={styles.inlinePoster}>
                    <ProjectPoster project={project} />
                  </div>
                </Project>
              </div>
            </details>
            <div ref={active === project.id ? activePoster : undefined} className={styles.poster}>
              <ProjectPoster project={project} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.end}>
        <a href="#contact">
          Get in touch <span aria-hidden="true">→</span>
        </a>
        <div>
          <a href="#experience">Experience</a>
          <a href="/cv.pdf" download>
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
