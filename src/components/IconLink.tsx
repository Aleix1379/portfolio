import React from 'react'
import styles from '../styles/IconLink.module.css'
import {
  Angular,
  Apollographql,
  Astro,
  CssThree,
  Github,
  Googlechrome,
  Googleplay,
  Appstore,
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
  Typescript,
  Vuedotjs,
  Nuxtdotjs
} from '@icons-pack/react-simple-icons'
import type { BrandIcon, Link } from '../types/Link'

interface IconLinkProps {
  link: Link
  className?: string | undefined
  color?: string
  size?: number
}

const IconLink: React.FC<IconLinkProps> = ({
  link,
  className,
  color = '#454545',
  size = 40
}) => {
  const icons = {
    // @ts-ignore
    googlePlay: <Googleplay title={'GooglePlay'} color={color} size={size} />,
    // @ts-ignore
    appStore: <Appstore title={'AppStore'} color={color} size={size} />,
    // @ts-ignore
    github: <Github title={'Github'} color={color} size={size} />,
    // @ts-ignore
    linkedin: <Linkedin title={'Linkedin'} color={color} size={size} />,
    // @ts-ignore
    web: <Googlechrome title={'Web'} color={color} size={size} />,
    // @ts-ignore
    react: <ReactJs title={'React'} color={color} size={size} />,
    // @ts-ignore
    redux: <Redux title={'Redux'} color={color} size={size} />,
    // @ts-ignore
    nodejs: <Nodedotjs title={'Nodejs'} color={color} size={size} />,
    // @ts-ignore
    postgres: <Postgresql title={'Postgres'} color={color} size={size} />,
    // @ts-ignore
    graphql: <Graphql title={'Graphql'} color={color} size={size} />,
    // @ts-ignore
    typescript: <Typescript title={'Typescript'} color={color} size={size} />,
    // @ts-ignore
    apollographql: (
      <Apollographql title={'Apollographql'} color={color} size={size} />
    ),
    // @ts-ignore
    kotlin: <Kotlin title={'Kotlin'} color={color} size={size} />,
    // @ts-ignore
    mysql: <Mysql title={'Mysql'} color={color} size={size} />,
    // @ts-ignore
    springBoot: <Springboot title={'SpringBoot'} color={color} size={size} />,
    // @ts-ignore
    hibernate: <Hibernate title={'Hibernate'} color={color} size={size} />,
    // @ts-ignore
    jest: <Jest title={'Jest'} color={color} size={size} />,
    // @ts-ignore
    sequelize: <Sequelize title={'Sequelize'} color={color} size={size} />,
    // @ts-ignore
    nextjs: <Nextdotjs title={'Next JS'} color={color} size={size} />,
    // @ts-ignore
    css3: <CssThree title={'CSS 3'} color={color} size={size} />,
    // @ts-ignore
    html5: <Html5 title={'HTML 5'} color={color} size={size} />,
    // @ts-ignore
    angular: <Angular title={'Angular'} color={color} size={size} />,
    // @ts-ignore
    astro: <Astro title={'Astro'} color={color} size={size} />,
    // @ts-ignore
    css: <CssThree title={'CSS'} color={color} size={size} />,
    // @ts-ignore
    vue: <Vuedotjs title={'Vue'} color={color} size={size} />,
    // @ts-ignore
    nuxt: <Nuxtdotjs title={'Nuxt'} color={color} size={size} />
  }
  const getIcon = (name: BrandIcon) => {
    return icons[name]
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={`${styles.link} ${className}`}>
      {getIcon(link.icon)}
      <span>{link.text}</span>
    </a>
  )
}

export default IconLink
