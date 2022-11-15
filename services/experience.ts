import { JobExperience } from '../types/JobExperience'

export const getExperience = (limit = -1): Array<JobExperience> => {
	let data: Array<JobExperience> = [
		{
			id: '1',
			title: 'Full-stack developer',
			company: 'TALKUAL',
			type: 'full-time',
			location: 'Bellpuig, Catalonia, Spain',
			start: '2021-12-01',
			end: null,
			technologies: [
				'Nuxt.js',
				'Vue.js',
				'Node JS',
				'Strapi'
			],
			description: 'Develop an ecommerce'
		},
		{
			id: '2',
			title: 'Front-end developer',
			company: 'Movetia',
			type: 'full-time',
			location: 'Barcelona, Catalonia, Spain',
			start: '2020-05-01',
			end: '2021-12-22',
			technologies: [
				'React JS'
			],
			description: 'Front end with React JS.'
		},
		{
			id: '3',
			title: 'Full-stack developer',
			company: 'Ubiquat Technologies',
			type: 'full-time',
			location: 'Igualada, Catalonia, Spain',
			start: '2016-08-01',
			end: '2019-09-15',
			technologies: [
				'Angular',
				'Node JS'
			],
			description: 'Web apps using the framework Angular JS.\nMobile apps for Android and iOS using Ionic 4 framework.\nBackend with Node JS and Typescript.\nDevelop the prototype of the application using https://www.fluidui.com/\nPublish apps on Google Play and App Store.'
		},
		{
			id: '6',
			title: 'Web developer',
			company: 'Coach4Pro',
			location: 'Espoo, Uusimaa, Finland (remote)',
			type: 'freelance',
			start: '2018-03-01',
			end: '2019-04-30',
			technologies: [
				'HTML5',
				'Javascript',
				'CSS'
			],
			description: 'I have worked as a freelancer around one year doing tasks of maintaining the front-end of the company website.'
		},
		{
			id: '5',
			title: 'Web developer',
			company: 'Ubiquat Technologies',
			type: 'internship',
			location: 'Igualada, Catalonia, Spain',
			start: '2016-01-01',
			end: '2016-05-31',
			technologies: [
				'Javascript',
				'JQuery',
				'Less',
				'Bootstrap'
			],
			description: 'I developed a web app to manage the users and information of a mobile app using bootstrap, less and jquery.\nMaintenance an Android app (Native with Java) and publish the application on google play.'
		},
		{
			id: '4',
			title: 'C# Developer',
			company: 'Ofimàtica anoia',
			type: 'internship',
			location: 'Igualada, Catalonia, Spain',
			start: '2014-10-01',
			end: '2015-01-31',
			technologies: [
				'C#',
				'Entity framework'
			],
			description: 'Design of Workflows with OpenKM\n\nSchedule an asp.net webform application with C # using entity framework\n\nWith C#: \n\nMake a program that allows to convert documents (office, images, html) to pdf, to be able to print them\n\nUse the printer driver to send print documents, with parameters (color, b / w, duplex)'
		}
	]

	data = data.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())

	if (limit === -1) {
		return data
	}

	return data.slice(0, limit)

}
