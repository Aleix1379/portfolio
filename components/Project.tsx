import React, { CSSProperties } from 'react'
import Image from 'next/image'
import styles from '../styles/Project.module.css'
import { Link } from '../types/Link'
import IconLink from './IconLink'
import { Platform } from '../types/Platform'

interface ProjectProps {
	name: string
	description: string
	platform: Platform
	image: string
	links: Array<Link>
	technologies: Array<Link>
}

const Project: React.FC<ProjectProps> = ({ name, description, platform, image, links, technologies }) => {
	const getChipStyle = (platform: Platform): CSSProperties => {
		const style = {
			backgroundColor: 'rgb(69,52,123)'
		}
		if (platform === 'mobile') {
			style.backgroundColor = 'rgb(23,114,25)'
		} else if (platform === 'web') {
			style.backgroundColor = 'rgb(176,94,45)'
		}
		return style
	}

	return (
		<div className={styles.project}>

			<div className={styles.title}>
				<h2 className={styles.subtitle}>{name}</h2>
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

			<h2 className={`${styles.subtitle} ${styles.pages}`}>Links</h2>
			{
				links.length > 0 &&
				<>
					<div className={`${styles.links} ${styles.linksLast}`}>
						{
							links.map((link, index) => <IconLink key={index} link={link} size={25} className={styles.link} />)
						}
					</div>
				</>
			}

			{
				links.length === 0 &&
				<div className={styles.noLinksAvailable}>
					<span>No links available</span>
				</div>
			}

		</div>
	)
}

export default Project
