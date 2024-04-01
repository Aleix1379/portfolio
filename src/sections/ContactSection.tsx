import React, { useState } from 'react'
import IconLink from '../components/IconLink'
import Input from '../components/Input'
import SubmitForm from '../components/SubmitForm'
import styles from '../styles/Home.module.css'
import type { Validation } from '../types/Validation.ts'
import Validator from '../services/Validator.ts'

interface Form {
  subject: string
  message: string
}

interface Validations {
  subject: Validation
  message: Validation
}

const initialFormState: Form = {
  subject: '',
  message: ''
}

const ContactSection = () => {
  const [form, setForm] = useState(initialFormState)
  const [isFormValid, setIsFormValid] = useState(false)

  const buildValidations = (): Validations => {
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

  // const [validations, setValidations] = useState<HomeState['validations']>(buildValidations)
  const [validations, setValidations] = useState<Validations>(buildValidations)

  const validator = new Validator(validations, setValidations)

  const updateForm = (input: 'subject' | 'message', text: string) => {
    const data = { ...form, [input]: text }
    setForm(data)
    validator.validateForm(data)

    // const val: HomeState["validations"] = { ...validations };
    const val: Validations = { ...validations }
    if (val[input]) {
      val[input].touched = true
    }
    setValidations({ ...validations, ...val })
    setIsFormValid(
      validations.subject.message.length === 0 &&
        validations.message.message.length === 0
    )
  }

  const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
      openEmail()
    }
  }

  const openEmail = () => {
    window.open(
      `mailto:aleixmp1379@gmail.com?subject=${form.subject}&body=${form.message}`,
      '_blank'
    )
  }

  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.formTitle}>Contact me</h2>
      <div className={styles.infoContact}>
        <img
          src="/images/contact.svg"
          alt="Contact"
          className={styles.image}
          width={500}
          height={620}
        />
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
          <form
            data-testid="contact-form"
            className={styles.form}
            onSubmit={sendMessage}>
            <Input
              testID="contact-form-subject"
              className={styles.input}
              label={'Subject'}
              value={form.subject}
              onChange={text => updateForm('subject', text)}
              // Add your validation logic here
            />
            <Input
              data-testid="contact-form-message"
              className={styles.input}
              label={'Message'}
              value={form.message}
              onChange={text => updateForm('message', text)}
              type={'textarea'}
              // Add your validation logic here
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
  )
}

export default ContactSection
