import React from 'react'
import styles from '../styles/Experience.module.css'
import { JobExperience } from '../types/JobExperience'
import Chip from './Chip'
import { formatDateWithMonthName, getDifference } from '../utils/time'

interface ExperienceProps {
	experience: JobExperience
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {

	return <div className={styles.experience}>
		<div className={styles.header}>
			<h2>{experience.title}</h2>
			<div className={styles.time}>
				<span className={styles.timeCapitalize}>{formatDateWithMonthName(experience.start, {
					month: true,
					year: true,
					short: true
				})}</span>
				<span> -  </span>
				{
					experience.end ?
						<span
							className={styles.timeCapitalize}> {formatDateWithMonthName(experience.end, {
								month: true,
								year: true,
								short: true
							})}</span> :
						<span className={styles.timeCapitalize}> present</span>
				}
				<span className={styles.duration}> {getDifference(experience.start, experience.end)}</span>
			</div>
		</div>

		<div className={styles.details}>
			<span className={styles.company}>{experience.company}</span>
			<div>
				{
					experience.technologies.map((technology, index) =>
						<Chip
							key={index}
							className={styles.technology}
						>
							{technology}
						</Chip>
					)
				}
			</div>
		</div>
		<div>
			{experience.description.split('\n').map((word, index) => <p key={index}>{word}</p>)}
		</div>
	</div>
}

export default Experience
