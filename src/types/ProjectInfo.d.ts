import type { Link } from './Link'
import type { Platform } from './Platform'

export interface AppInfo {
  id: string
  name: string
  platform: Platform
  description: string
  technologies: Array<Link>
}

export interface ProjectPreview {
  src: string
  alt: string
  width: number
  height: number
  srcSet?: string
}

interface ProjectBaseInfo {
  id: string
  name: string
  description: string
  image: string
  links: Array<Link>
  apps: Array<AppInfo>
}

export interface FeaturedProjectInfo extends ProjectBaseInfo {
  active: true
  preview: ProjectPreview
  contribution: string
  featuredTechnologies: Array<string>
}

export interface HistoricalProjectInfo extends ProjectBaseInfo {
  active: false
  preview?: ProjectPreview
  contribution?: string
  featuredTechnologies?: Array<string>
}

export type ProjectInfo = FeaturedProjectInfo | HistoricalProjectInfo
