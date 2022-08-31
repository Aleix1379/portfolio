export interface JobExperience {
	id: string
	title: string
	company: string
	start: string
	end: string | null
	technologies: Array<string>
	description: string
}
