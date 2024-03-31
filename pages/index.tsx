import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AppLayout from '../components/AppLayout'
import Input from '../components/Input'
import React, { useState } from 'react'
import SubmitForm from '../components/SubmitForm'
import Project from '../components/Project'
import IconLink from '../components/IconLink'
import { JobExperience } from '../types/JobExperience'
import Experience from '../components/Experience'
import ExperienceSeparator from '../components/ExperienceSeparator'
import { Validation } from '../types/Validation'
import Validator from '../services/Validator'
import { getYearsOfExperience } from '../utils/time'
import { getExperience } from '../services/experience'
import { getProjects } from '../services/projects'
import { ProjectInfo } from '../types/Project.Infod'
import Button from '../components/Button'

interface HomeState {
	form: {
		subject: string
		message: string
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

	const [projects, setProjects] = useState<Array<ProjectInfo>>(getProjects(3))
	const [showAllProjects, setShowAllProjects] = useState<boolean>(false)

	const [experiences, setExperiences] = useState<Array<JobExperience>>(getExperience(3))
	const [showAllExperiences, setShowAllExperiences] = useState<boolean>(false)


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

	const downloadCV = async () => {
		const response = await fetch('/cv.pdf')
		const blob = await response.blob()
		const url = window.URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.style.display = 'none'
		a.href = url
		a.download = 'cv.pdf'
		document.body.appendChild(a)
		a.click()
		a.remove()
		window.URL.revokeObjectURL(url)
	}

	const fetchAllProjects = () => {
		setProjects(getProjects())
		setShowAllProjects(true)
	}

	const fetchAllExperiences = () => {
		setExperiences(getExperience())
		setShowAllExperiences(true)
	}

	return (
		<AppLayout>
			<main className={styles.main}>
				<Button className={styles.downloadCv} onClick={downloadCV}>Download CV</Button>

				<section id='about' className={styles.section}>
					<h2>About me</h2>
					<div className={styles.infoAbout}>
						<img src="/images/about.svg" alt="About" className={styles.image} width={800} height={300} />
						<div>
							<span className={styles.important}>
								<span>+ </span>
								<span>{
									getYearsOfExperience(
										{
											filter: {
												fullTime: true
											}
										}
									)
								}</span>
								<span> years </span>
							</span>
							<span> of experience as a full stack developer.</span>
							<p>
								Working with web and mobile apps using web technologies.
							</p>
						</div>
					</div>
				</section>

				<section id="experience" className={styles.section}>
					<h2>Experience</h2>
					<img src="/images/experience.svg" alt="Experience" className={styles.image} width={300} height={300} />
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

					{!showAllExperiences && <Button onClick={fetchAllExperiences}>Show all</Button>}
				</section>

				<section id='projects' className={styles.section}>
					<h2>Projects</h2>

					<div className={styles.infoProjects}>
						<img src="/images/projects.svg" alt="Projects" className={styles.image} width={635} height={300} />
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

					{!showAllProjects && <Button onClick={fetchAllProjects}>Show All</Button>}
				</section>

				<section id='contact' className={styles.section}>
					<h2 className={styles.formTitle}>Contact me</h2>

					<div className={styles.infoContact}>

						<img src="/images/contact.svg" alt="Contact" className={styles.image} width={500} height={620} />

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
							<form data-testid='contact-form' className={styles.form} onSubmit={sendMessage}>
								<Input
									testID='contact-form-subject'
									className={styles.input}
									label={'Subject'}
									value={form.subject}
									onChange={text => updateForm('subject', text)}
									validation={validations.subject}
								/>
								<Input
									data-testid='contact-form-message'
									className={styles.input}
									label={'Message'}
									value={form.message}
									onChange={text => updateForm('message', text)}
									type={'textarea'}
									validation={validations.message}
								/>

								<SubmitForm
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
