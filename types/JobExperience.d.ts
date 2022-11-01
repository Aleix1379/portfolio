export interface JobExperience {
	id: string
	title: string
	company: string
	start: string
	end: string | null
	technologies: Array<string>
	description: string
	type: 'full-time' | 'freelance' | 'internship'
	location: string
}


export interface jobDuration {
	start: Date
	end: Date
}
