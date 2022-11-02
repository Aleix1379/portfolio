import { Platform } from './Platform'
import { Link } from './Link'

export interface ProjectInfo {
	id: string
	name: string
	platform: Platform
	description: string
	image: string
	links: Array<Link>
	technologies: Array<Link>
}
