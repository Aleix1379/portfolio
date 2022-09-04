import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AppLayout from '../components/AppLayout'
import Input from '../components/Input'
import React, { useState } from 'react'
import Button from '../components/Button'
import Project from '../components/Project'
import { Link } from '../types/Link'
import Image from 'next/image'
import IconLink from '../components/IconLink'
import { Platform } from '../types/Platform'
import { JobExperience } from '../types/JobExperience'
import Experience from '../components/Experience'
import ExperienceSeparator from '../components/ExperienceSeparator'
import { Validation } from '../types/Validation'
import Validator from '../services/Validator'
import { getYearsOfExperience } from '../utils/time'

interface HomeState {
	form: {
		subject: string
		message: string
	}
	project: {
		id: string
		name: string
		platform: Platform
		description: string
		image: string
		links: Array<Link>
		technologies: Array<Link>
	},
	validations: {
		subject: Validation,
		message: Validation
	}
}

const Home: NextPage = () => {
	const [form, setForm] = useState<HomeState['form']>({
		subject: '',
		message: ''
	})

	const [projects] = useState<Array<HomeState['project']>>([
		{
			id: '6',
			name: 'Portfolio',
			description: 'Web to show my projects and opportunity to learn NextJS.',
			platform: 'web',
			image: '/images/projects/portfolio.webp',
			links: [
				{
					url: 'https://github.com/Aleix1379/portfolio',
					text: 'Github',
					icon: 'github'
				}
			],
			technologies: [
				{
					url: 'https://www.typescriptlang.org/',
					text: 'TypeScript',
					icon: 'typescript'
				},
				{
					url: 'https://html.spec.whatwg.org/multipage/',
					text: 'HTML 5',
					icon: 'html5'
				},
				{
					url: 'https://www.w3.org/Style/CSS/Overview.en.html',
					text: 'CSS 3',
					icon: 'css3'
				},
				{
					url: 'https://nextjs.org/',
					text: 'NextJS',
					icon: 'nextjs'
				},
				{
					url: 'https://reactjs.org/',
					text: 'React',
					icon: 'react'
				}
			]
		},
		{
			id: '1',
			name: 'Talk And Play',
			description: 'Mobile app to talk about video games.',
			platform: 'mobile',
			image: '/images/projects/talkandplay.webp',
			links: [
				{
					url: 'https://play.google.com/store/apps/details?id=app.talkandplay',
					text: 'Google play',
					icon: 'googlePlay'
				}
			],
			technologies: [
				{
					url: 'https://www.typescriptlang.org/',
					text: 'TypeScript',
					icon: 'typescript'
				},
				{
					url: 'https://reactnative.dev/',
					text: 'React Native',
					icon: 'react'
				},
				{
					url: 'https://redux.js.org/',
					text: 'Redux',
					icon: 'redux'
				}
			]
		},
		{
			id: '2',
			name: 'Talk And Play',
			description: 'Backend for Talk and play.',
			platform: 'backend',
			image: '/images/projects/talkandplay.webp',
			links: [],
			technologies: [
				{
					url: 'https://kotlinlang.org/',
					text: 'Kotlin',
					icon: 'kotlin'
				},
				{
					url: 'https://www.mysql.com/',
					text: 'Spring Boot',
					icon: 'springBoot'
				},
				{
					url: 'https://spring.io/projects/spring-boot',
					text: 'MySQL',
					icon: 'mysql'
				},
				{
					url: 'https://hibernate.org/',
					text: 'Hibernate',
					icon: 'hibernate'
				}
			]
		},
		{
			id: '3',
			name: 'Enirve',
			description: 'Mobile app to learn irregular verbs in English',
			platform: 'mobile',
			image: '/images/projects/enirve.webp',
			links: [
				{
					url: 'https://play.google.com/store/apps/details?id=com.enirvemobile',
					text: 'Google play',
					icon: 'googlePlay'
				},
				{
					url: 'https://github.com/Aleix1379/EnirveMobile',
					text: 'Github',
					icon: 'github'
				}
			],
			technologies: [
				{
					url: 'https://www.typescriptlang.org/',
					text: 'TypeScript',
					icon: 'typescript'
				},
				{
					url: 'https://reactnative.dev/',
					text: 'React Native',
					icon: 'react'
				},
				{
					url: 'https://redux.js.org/',
					text: 'Redux',
					icon: 'redux'
				},
				{
					url: 'https://graphql.org/',
					text: 'GraphQL',
					icon: 'graphql'
				},
				{
					url: 'https://www.apollographql.com/',
					text: 'Apollo GraphQL',
					icon: 'apollographql'
				}
			]
		},
		{
			id: '4',
			name: 'Enirve',
			description: 'Backend for Enirve.',
			platform: 'backend',
			image: '/images/projects/enirve.webp',
			links: [
				{
					url: 'https://github.com/Aleix1379/EnirveBackend',
					text: 'Github',
					icon: 'github'
				}
			],
			technologies: [
				{
					url: 'https://www.typescriptlang.org/',
					text: 'TypeScript',
					icon: 'typescript'
				},
				{
					url: 'https://nodejs.org/',
					text: 'Node JS',
					icon: 'nodejs'
				},
				{
					url: 'https://www.postgresql.org/',
					text: 'PostgreSQL',
					icon: 'postgres'
				},
				{
					url: 'https://sequelize.org/',
					text: 'Sequelize',
					icon: 'sequelize'
				},
				{
					url: 'https://graphql.org/',
					text: 'GraphQL',
					icon: 'graphql'
				},
				{
					url: 'https://www.apollographql.com/',
					text: 'Apollo GraphQL',
					icon: 'apollographql'
				}
			]
		},
		{
			id: '5',
			name: 'Travels & Trips',
			description: 'Prototype mobile app abouts trips.',
			platform: 'mobile',
			image: '/images/projects/tratrip.webp',
			links: [
				{
					url: 'https://play.google.com/store/apps/details?id=com.aleixmp.tratripmobileapp',
					text: 'Google play',
					icon: 'googlePlay'
				},
				{
					url: 'https://github.com/Aleix1379/TraTripMobileApp',
					text: 'Github',
					icon: 'github'
				}
			],
			technologies: [
				{
					url: 'https://www.typescriptlang.org/',
					text: 'TypeScript',
					icon: 'typescript'
				},
				{
					url: 'https://reactnative.dev/',
					text: 'React Native',
					icon: 'react'
				},
				{
					url: 'https://jestjs.io/',
					text: 'Jest',
					icon: 'jest'
				}
			]
		},
		{
			id: '7',
			name: 'Spotify player',
			description: 'Web app to list and play your favourite music from spotify.',
			platform: 'web',
			image: '/images/projects/spotify.png',
			links: [
				{
					url: 'https://github.com/Aleix1379/SpotiViewer',
					text: 'Github',
					icon: 'github'
				}
			],
			technologies: [
				{
					url: 'https://www.typescriptlang.org/',
					text: 'TypeScript',
					icon: 'typescript'
				},
				{
					url: 'https://angular.io/',
					text: 'Angular',
					icon: 'angular'
				},
				{
					url: 'https://html.spec.whatwg.org/multipage/',
					text: 'HTML 5',
					icon: 'html5'
				},
				{
					url: 'https://www.w3.org/Style/CSS/Overview.en.html',
					text: 'CSS 3',
					icon: 'css3'
				}
			]
		}
	])

	const [experiences] = useState<Array<JobExperience>>([
		{
			id: '1',
			title: 'Full-stack developer',
			company: 'TALKUAL',
			start: '2021-12-01',
			end: null,
			technologies: ['Nuxt.js', 'Vue.js', 'Node JS', 'Strapi'],
			description: 'Develop an ecommerce'
		},
		{
			id: '2',
			title: 'Front-end developer',
			company: 'Movetia',
			start: '2020-05-01',
			end: '2021-12-22',
			technologies: ['React JS'],
			description: `Front end con React JS.
Backend con Java`
		},
		{
			id: '3',
			title: 'Full-stack developer',
			company: 'Ubiquat Technologies',
			start: '2016-08-01',
			end: '2019-09-15',
			technologies: ['Angular', 'Node JS'],
			description: `Web apps using the framework Angular JS.
Mobile apps for Android and iOS using Ionic 4 framework.
Backend with Node JS and Typescript.
Develop the prototype of the application using https://www.fluidui.com/
Publish apps on Google Play and App Store.`
		}
	])

	const buildValidations = (): HomeState['validations'] => {
		return {
			subject: {
				message: 'Subject',
				touched: false,
				label: '',
				constraints: [
					{
						key: 'REQUIRED'
					},
					{
						key: 'MAX_LENGTH',
						value: 60
					}
				]
			},
			message: {
				message: '',
				touched: false,
				label: 'Message',
				constraints: [
					{
						key: 'REQUIRED'
					},
					{
						key: 'MAX_LENGTH',
						value: 500
					}
				]
			}
		}
	}

	const [validations, setValidations] = useState<HomeState['validations']>(buildValidations)

	const validator = new Validator(validations, setValidations)

	const updateForm = (input: 'subject' | 'message', text: string) => {
		const data = { ...form, [input]: text }
		setForm(data)
		validator.validateForm(data)

		const val: HomeState['validations'] = { ...validations }
		if (val[input]) {
			val[input].touched = true
		}
		setValidations({ ...validations, ...val })
		setIsFormValid(
			validations.subject.message.length === 0 &&
			validations.message.message.length === 0
		)
	}

	const [isFormValid, setIsFormValid] = useState(false)

	const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
		if (event) {
			event.preventDefault()
			openEmail()
		}
		console.info('form:', form)
	}

	const openEmail = () => {
		window.open(`mailto:aleixmp1379@gmail.com?subject=${form.subject}&body=${form.message}`, '_blank')
	}

	return (
		<AppLayout>
			<main className={styles.main}>
				<section id='about' className={styles.section}>
					<h2>About me</h2>
					<div className={styles.infoAbout}>
						<Image src={'/images/about.svg'} height={300} width={300} />
						<div>
							<span className={styles.important}>
							+{
									getYearsOfExperience(experiences.map(experience => ({
										start: new Date(experience.start),
										end: experience.end ? new Date(experience.end) : new Date()
									})))
								} years</span> <span>of experience as a front end developer.</span>
							<p>
								Working with web and mobile apps.
							</p>
							<p>
								Focused on building user interfaces with web technologies.
							</p>
						</div>
					</div>
				</section>

				<section id='experience' className={styles.section}>
					<h2>Experience</h2>
					<Image src={'/images/experience.svg'} height={300} width={300} />
					<div className={styles.infoExperience}>
						{
							experiences.map((experience, index) =>
								<div key={index}>
									<Experience experience={experience} />
									{index < experiences.length - 1 && <ExperienceSeparator />}
								</div>
							)
						}
					</div>
				</section>

				<section id='projects' className={styles.section}>
					<h2>Projects</h2>

					<div className={styles.infoProjects}>
						<Image src={'/images/projects.svg'} height={300} width={300} />
						<div>
							<span>I like to work on personal projects to improve and learn new technologies, usually with</span>
							<span className={styles.important}> React JS</span>,
							<span className={styles.important}> React Native </span>and
							<span className={styles.important}> NodeJS</span>
						</div>
					</div>

					<div className={styles.projects}>
						{
							projects.map(project => (
								<Project
									key={project.id}
									name={project.name}
									description={project.description}
									platform={project.platform}
									image={project.image}
									links={project.links}
									technologies={project.technologies}
								/>
							))
						}
					</div>

				</section>

				<section id='contact' className={styles.section}>
					<h2 className={styles.formTitle}>Contact me</h2>

					<div className={styles.infoContact}>

						<Image src={'/images/contact.svg'} height={300} width={300} />

						<div>
							<div className={styles.socialNetworks}>
								<IconLink
									link={{
										url: 'https://www.linkedin.com/in/aleixmp/',
										text: 'Linkedin',
										icon: 'linkedin'
									}}
									size={50}
									color={'#909090'}
								/>
								<IconLink
									link={{
										url: 'https://github.com/Aleix1379',
										text: 'Github',
										icon: 'github'
									}}
									size={50}
									color={'#909090'}
								/>
							</div>
							<form className={styles.form} onSubmit={sendMessage}>
								<Input
									className={styles.input}
									label={'Subject'}
									value={form.subject}
									onChange={text => updateForm('subject', text)}
									validation={validations.subject}
								/>
								<Input
									className={styles.input}
									label={'Message'}
									value={form.message}
									onChange={text => updateForm('message', text)}
									type={'textarea'}
									validation={validations.message}
								/>

								<Button
									className={styles.button}
									label={'Send!'}
									onClick={sendMessage}
									disabled={!isFormValid}
								/>
							</form>
						</div>

					</div>
				</section>

			</main>
		</AppLayout>
	)
}

export default Home
