import React, { type CSSProperties } from 'react'
import useMagneticHover from '../hooks/useMagneticHover'
import styles from '../styles/IconLink.module.css'
import badgeStyles from '../styles/Badge.module.css'
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
  Nuxtdotjs,
  Nestjs
} from '@icons-pack/react-simple-icons'
import type { BrandIcon, Link } from '../types/Link'

interface IconLinkProps {
  link: Link
  className?: string | undefined
  color?: string
  size?: number
  variant?: 'chip' | 'action' | 'plain'
  onClick?: () => void
}

interface GlyphProps {
  title?: string
  color?: string
  size?: number | undefined
}

const MailGlyph: React.FC<GlyphProps> = ({
  title,
  color = 'currentColor',
  size
}) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    aria-hidden={title ? undefined : true}
  >
    {title ? <title>{title}</title> : null}
    {/* Optical match to simple-icons brand glyphs (same ink area in 24×24) */}
    <g transform="translate(12 12) scale(1.2 1.5) translate(-12 -12)">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </g>
  </svg>
)

const getActionIconRotate = (url: string, icon: string): number => {
  const seed = `${url}:${icon}`
  let hash = 0

  for (let index = 0; index < seed.length; index++) {
    hash = (hash * 33 + seed.charCodeAt(index)) >>> 0
  }

  const sign = hash % 2 === 0 ? -1 : 1
  const magnitude = 8 + (hash % 3)

  return sign * magnitude
}

const IconLink: React.FC<IconLinkProps> = ({
  link,
  className,
  color = 'currentColor',
  size,
  variant = 'chip',
  onClick
}) => {
  const actionRef = useMagneticHover<HTMLAnchorElement>()
  const glyphSize = size ?? (variant === 'chip' ? 14 : undefined)

  const icons = {
    email: <MailGlyph title={'Email'} color={color} size={glyphSize} />,
    // @ts-ignore
    googlePlay: <Googleplay title={'GooglePlay'} color={color} size={glyphSize} />,
    // @ts-ignore
    appStore: <Appstore title={'AppStore'} color={color} size={glyphSize} />,
    // @ts-ignore
    github: <Github title={'Github'} color={color} size={glyphSize} />,
    // @ts-ignore
    linkedin: <Linkedin title={'Linkedin'} color={color} size={glyphSize} />,
    // @ts-ignore
    web: <Googlechrome title={'Web'} color={color} size={glyphSize} />,
    // @ts-ignore
    react: <ReactJs title={'React'} color={color} size={glyphSize} />,
    // @ts-ignore
    redux: <Redux title={'Redux'} color={color} size={glyphSize} />,
    // @ts-ignore
    nodejs: <Nodedotjs title={'Nodejs'} color={color} size={glyphSize} />,
    // @ts-ignore
    postgres: <Postgresql title={'Postgres'} color={color} size={glyphSize} />,
    // @ts-ignore
    graphql: <Graphql title={'Graphql'} color={color} size={glyphSize} />,
    // @ts-ignore
    typescript: <Typescript title={'Typescript'} color={color} size={glyphSize} />,
    apollographql: (
      // @ts-ignore
      <Apollographql title={'Apollographql'} color={color} size={glyphSize} />
    ),
    // @ts-ignore
    kotlin: <Kotlin title={'Kotlin'} color={color} size={glyphSize} />,
    // @ts-ignore
    mysql: <Mysql title={'Mysql'} color={color} size={glyphSize} />,
    // @ts-ignore
    springBoot: <Springboot title={'SpringBoot'} color={color} size={glyphSize} />,
    // @ts-ignore
    hibernate: <Hibernate title={'Hibernate'} color={color} size={glyphSize} />,
    // @ts-ignore
    jest: <Jest title={'Jest'} color={color} size={glyphSize} />,
    // @ts-ignore
    sequelize: <Sequelize title={'Sequelize'} color={color} size={glyphSize} />,
    // @ts-ignore
    nextjs: <Nextdotjs title={'Next JS'} color={color} size={glyphSize} />,
    // @ts-ignore
    css3: <CssThree title={'CSS 3'} color={color} size={glyphSize} />,
    // @ts-ignore
    html5: <Html5 title={'HTML 5'} color={color} size={glyphSize} />,
    // @ts-ignore
    angular: <Angular title={'Angular'} color={color} size={glyphSize} />,
    // @ts-ignore
    astro: <Astro title={'Astro'} color={color} size={glyphSize} />,
    // @ts-ignore
    css: <CssThree title={'CSS'} color={color} size={glyphSize} />,
    // @ts-ignore
    vue: <Vuedotjs title={'Vue'} color={color} size={glyphSize} />,
    // @ts-ignore
    nuxt: <Nuxtdotjs title={'Nuxt'} color={color} size={glyphSize} />,
    // @ts-ignore
    nestjs: <Nestjs title={'Nest'} color={color} size={glyphSize} />
  }
  const getIcon = (name: BrandIcon) => {
    return icons[name]
  }

  const baseClass =
    variant === 'plain'
      ? styles.linkPlain
      : variant === 'action'
        ? styles.linkAction
        : styles.link

  const iconClass =
    variant === 'plain'
      ? styles.plainIcon
      : variant === 'action'
        ? styles.actionIcon
        : styles.icon

  const labelClass =
    variant === 'plain'
      ? styles.plainLabel
      : variant === 'action'
        ? styles.actionLabel
        : styles.label

  const actionStyle =
    variant === 'action'
      ? ({
          '--action-icon-rotate': `${getActionIconRotate(link.url, link.icon)}deg`
        } as CSSProperties)
      : undefined

  return (
    <a
      ref={variant === 'action' ? actionRef : undefined}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      aria-label={link.text}
      className={`${baseClass} ${className || ''}`}
      style={actionStyle}
      onClick={onClick}
    >
      {variant === 'plain' ? (
        <>
          <span className={iconClass} aria-hidden="true">
            {getIcon(link.icon)}
          </span>
          <span className={labelClass}>{link.text}</span>
        </>
      ) : variant === 'action' ? (
        <>
          <span className={`${badgeStyles.badgeTrack} ${styles.actionTrack}`}>
            <span className={iconClass} aria-hidden="true">
              {getIcon(link.icon)}
            </span>
            <span className={labelClass}>{link.text}</span>
          </span>
          <span className={styles.actionShine} aria-hidden="true" />
        </>
      ) : (
        <span className={badgeStyles.badgeTrack}>
          <span className={iconClass} aria-hidden="true">
            {getIcon(link.icon)}
          </span>
          <span className={labelClass}>{link.text}</span>
        </span>
      )}
    </a>
  )
}

export default IconLink
