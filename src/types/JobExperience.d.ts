export interface JobExperience {
	id: string
	title: string
	company: string
	start: string
	end: string | null
	technologies: Array<string>
	responsibilities: Array<string>
	type: string
	location: string
}


export interface JobOptions {
	filter: {
		fullTime?: boolean
		freelance?: boolean
		internship?: boolean
	}
}
