import styles from '../styles/IconLink.module.css'
import {
	Apollographql,
	CssThree,
	Github,
	Googlechrome,
	Googleplay,
	Graphql,
	Hibernate,
	Html5,
	Jest,
	Kotlin,
	Linkedin,
	Mysql,
	Nextdotjs,
	Nodedotjs,
	Postgresql,
	ReactJs,
	Redux,
	Sequelize,
	Springboot,
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


const IconLink: React.FC<IconLinkProps> = ({ link, className, color = '#454545', size = 40 }) => {
	const icons = {
		googlePlay: <Googleplay title={'GooglePlay'} color={color} size={size} />,
		github: <Github title={'Github'} color={color} size={size} />,
		linkedin: <Linkedin title={'Linkedin'} color={color} size={size} />,
		web: <Googlechrome title={'Web'} color={color} size={size} />,
		react: <ReactJs title={'React'} color={color} size={size} />,
		redux: <Redux title={'Redux'} color={color} size={size} />,
		nodejs: <Nodedotjs title={'Nodejs'} color={color} size={size} />,
		postgres: <Postgresql title={'Postgres'} color={color} size={size} />,
		graphql: <Graphql title={'Graphql'} color={color} size={size} />,
		typescript: <Typescript title={'Typescript'} color={color} size={size} />,
		apollographql: <Apollographql title={'Apollographql'} color={color} size={size} />,
		kotlin: <Kotlin title={'Kotlin'} color={color} size={size} />,
		mysql: <Mysql title={'Mysql'} color={color} size={size} />,
		springBoot: <Springboot title={'SpringBoot'} color={color} size={size} />,
		hibernate: <Hibernate title={'Hibernate'} color={color} size={size} />,
		jest: <Jest title={'Jest'} color={color} size={size} />,
		sequelize: <Sequelize title={'Sequelize'} color={color} size={size} />,
		nextjs: <Nextdotjs title={'Next JS'} color={color} size={size} />,
		css3: <CssThree title={'CSS 3'} color={color} size={size} />,
		html5: <Html5 title={'HTML 5'} color={color} size={size} />
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
