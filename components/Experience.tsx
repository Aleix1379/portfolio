import React from 'react'
import styles from '../styles/Experience.module.css'
import { JobExperience } from '../types/JobExperience'
import Chip from './Chip'
import { getDifference } from '../utils/time'
import dayjs from 'dayjs'

interface ExperienceProps {
	experience: JobExperience
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {

	return <div className={styles.experience}>
		<div className={styles.header}>
			<h2>{experience.title}</h2>
			<div className={styles.time}>
				<span>{dayjs(experience.start).format('MMM YYYY')}</span>
				{
					experience.end ?
						<span>{dayjs(experience.end).format(' - MMM YYYY')}</span> :
						<span> - Present</span>
				}
				<span> · {getDifference(experience.start, experience.end)}</span>
			</div>
		</div>
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
		<p>
			{experience.description}
		</p>
	</div>
}

export default Experience
