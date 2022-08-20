import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AppLayout from '../components/AppLayout'
import Input from '../components/Input'
import React, { useState } from 'react'
import Button from '../components/Button'

interface HomeState {
	form: {
		name: string
		email: string
		subject: string
		message: string
	}
}

const Home: NextPage = () => {
	const [form, setForm] = useState<HomeState['form']>({
		name: '',
		email: '',
		subject: '',
		message: ''
	})

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

				<section id='experience' className={styles.section}>
					<h2>Experience</h2>
					<p>
						experience section | asdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflk
					</p>
				</section>

				<section id='projects' className={styles.section}>
					<h2>Projects</h2>
					<p>
						projects section | asdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf
						laksdjflkasdjflkasdfjasldkfj alksdjfalksd jfalksdjf laksdjflkasdjflkasdfjasldkfj
						alksdjfalksd
						jfalksdjf laksdjflkasdjflk
					</p>
				</section>

				<section id='contact' className={styles.section}>
					<h2 className={styles.formTitle}>Contact me</h2>
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
							onChange={text => updateForm('email', text)} type='email'
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
