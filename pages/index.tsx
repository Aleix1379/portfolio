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

interface HomeState {
	form: {
		name: string
		email: string
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
	}
}

const Home: NextPage = () => {
	const [form, setForm] = useState<HomeState['form']>({
		name: '',
		email: '',
		subject: '',
		message: ''
	})

	const [projects] = useState<Array<HomeState['project']>>([
		{
			id: '6',
			name: 'Portfolio',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus risus ac felis mollis, cursus volutpat purus lobortis.',
			platform: 'web',
			image: '/images/projects/talkandplay.webp',
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
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus risus ac felis mollis, cursus volutpat purus lobortis.',
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
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus risus ac felis mollis, cursus volutpat purus lobortis.',
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
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus risus ac felis mollis, cursus volutpat purus lobortis.',
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
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus risus ac felis mollis, cursus volutpat purus lobortis.',
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
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus risus ac felis mollis, cursus volutpat purus lobortis.',
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
		}
	])

	const updateForm = (input: string, text: string) => {
		setForm({ ...form, [input]: text })
	}

	const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
		if (event) {
			event.preventDefault()
		}
		console.info('form:', form)
	}

	return (
		<AppLayout>
			<main className={styles.main}>
				<section id='about' className={styles.section}>
					<h2>About me</h2>
					<div className={styles.infoAbout}>
						<div>
							<span className={styles.important}>+5 years</span> <span>of experience as a front end developer.</span>
							<p>
								Working with web and mobile apps.
							</p>
							<p>
								Focused on building user interfaces with web technologies.
							</p>
						</div>
						<Image src={'/images/about.svg'} height={300} width={300} />
					</div>
				</section>

				<section id='projects' className={styles.section}>
					<h2>Projects</h2>

					<div className={styles.infoProjects}>
						<Image src={'/images/projects.svg'} height={300} width={300} />
						<div>
							I like to work on personal projects to improve and learn new technologies, usually with
							<span className={styles.important}> React</span>,
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
									label={'Name'}
									value={form.name}
									onChange={text => updateForm('name', text)}
								/>
								<Input
									className={styles.input}
									label={'Email'}
									value={form.email}
									onChange={text => updateForm('email', text)}
									type='email'
								/>
								<Input
									className={styles.input}
									label={'Subject'}
									value={form.subject}
									onChange={text => updateForm('subject', text)}
								/>
								<Input
									className={styles.input}
									label={'Message'}
									value={form.message}
									onChange={text => updateForm('message', text)}
									type={'textarea'}
								/>

								<Button className={styles.button} label={'Send!'} onClick={sendMessage} />
							</form>
						</div>

						<Image src={'/images/contact.svg'} height={300} width={300} />


					</div>
				</section>

			</main>
		</AppLayout>
	)
}

export default Home
