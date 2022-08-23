import React, { CSSProperties } from 'react'
import Image from 'next/image'
import styles from '../styles/Project.module.css'
import { Link } from '../types/Link'
import IconLink from './IconLink'

interface ProjectProps {
	name: string
	description: string
	platform: 'mobile' | 'backend'
	image: string
	links: Array<Link>
	technologies: Array<Link>
}

const Project: React.FC<ProjectProps> = ({ name, description, platform, image, links, technologies }) => {
	const getChipStyle = (platform: 'mobile' | 'backend'): CSSProperties => {
		if (platform === 'mobile') {
			return {
				backgroundColor: 'rgb(23,114,25)'

			}
		}
		return {
			backgroundColor: 'rgb(69,52,123)'
		}
	}

	return (
		<div className={styles.project}>

			<div className={styles.title}>
				<h2>{name}</h2>
				<span className={styles.chip} style={getChipStyle(platform)}>{platform}</span>
			</div>

			<div className={styles.image}>
				<Image src={image} width={200} height={200} layout={'intrinsic'} />
			</div>

			<p>
				{description}
			</p>

			<h2 className={styles.subtitle}>Technologies</h2>
			<div className={styles.links}>
				{
					technologies.map((technology, index) =>
						<IconLink
							key={index}
							link={technology}
							size={25}
							className={styles.link}
						/>
					)
				}
			</div>

			{
				links.length > 0 &&
				<>
					<h2 className={`${styles.subtitle} ${styles.pages}`}>Links</h2>
					<div className={`${styles.links} ${styles.linksLast}`}>
						{
							links.map((link, index) => <IconLink key={index} link={link} size={25} className={styles.link} />)
						}
					</div>
				</>
			}

		</div>
	)
}

export default Project
