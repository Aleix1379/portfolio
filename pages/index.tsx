import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AppLayout from '../components/AppLayout'
import Input from '../components/Input'
import React, { useState } from 'react'
import Button from '../components/Button'
import { Github, Linkedin } from '@icons-pack/react-simple-icons'
import Project from '../components/Project'
import { Link } from '../types/Link'

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
		platform: 'mobile' | 'backend'
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
					url: 'https://graphql.org/',
					text: 'GraphQL',
					icon: 'graphql'
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
					text: 'Travels & Trips',
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
				<section id='about' className={`${styles.section} ${styles.about}`}>
					<h2>About</h2>
					<p>
						+5 years of experience.
						I have been working as a Front End Developer designing and implementing user interfaces.
						I have used AngularJS, Angular 7, Ionic 4, Node JS, Typescript, MongoDB, React Native and Sass.
						I am interested in web development (Front End and Back End) and mobile applications.
					</p>
				</section>

				<section id='projects' className={styles.section}>
					<h2>Projects</h2>

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
					<div className={styles.socialNetworks}>
						<a href='https://www.linkedin.com/in/aleixmp/' target='_blank' rel='noreferrer'>
							<Linkedin title='Linkedin' color='#0A66C2' size={50} />
						</a>
						<a href='https://github.com/Aleix1379' target='_blank' rel='noreferrer'>
							<Github title='Github' color='#181717' size={50} />
						</a>
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
				</section>

			</main>
		</AppLayout>
	)
}

export default Home
