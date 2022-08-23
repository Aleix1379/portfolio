import styles from '../styles/IconLink.module.css'
import {
	Apollographql,
	Github,
	Googlechrome,
	Googleplay,
	Graphql,
	Linkedin,
	Nodedotjs,
	Postgresql,
	ReactJs,
	Redux,
	Typescript
} from '@icons-pack/react-simple-icons'
import React from 'react'
import { BrandIcon, Link } from '../types/Link'

interface IconLinkProps {
	link: Link
	className?: string | undefined
	color?: string
	size?: number
}


const IconLink: React.FC<IconLinkProps> = ({ link, className, color = '#424242', size = 40 }) => {
	const icons = {
		googlePlay: <Googleplay color={color} size={size} />,
		github: <Github color={color} size={size} />,
		linkedin: <Linkedin color={color} size={size} />,
		web: <Googlechrome color={color} size={size} />,
		react: <ReactJs color={color} size={size} />,
		redux: <Redux color={color} size={size} />,
		nodejs: <Nodedotjs color={color} size={size} />,
		postgres: <Postgresql color={color} size={size} />,
		graphql: <Graphql color={color} size={size} />,
		typescript: <Typescript color={color} size={size} />,
		apollographql: <Apollographql color={color} size={size} />
	}
	const getIcon = (name: BrandIcon) => {
		return icons[name]
	}

	return (
		<a href={link.url} target='_blank' rel='noreferrer' className={`${styles.link} ${className}`}>
			{getIcon(link.icon)}
			<span>{link.text}</span>
		</a>
	)
}

export default IconLink