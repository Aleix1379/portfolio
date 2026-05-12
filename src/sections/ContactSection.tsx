import React, { type CSSProperties, useState } from 'react'
import IconLink from '../components/IconLink'
import Input from '../components/Input'
import SubmitForm from '../components/SubmitForm'
import useReveal from '../hooks/useReveal.ts'
import styles from '../styles/Home.module.css'
import type { Validation } from '../types/Validation.ts'

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

const getValidationMessage = (
  value: string,
  label: string,
  maxLength: number
): string => {
  if (value.length === 0) {
    return `Please enter your ${label}`
  }

  if (value.length > maxLength) {
    return `${label} cannot be longer than ${maxLength} characters`
  }

  return ''
}

const ContactSection = () => {
  const [form, setForm] = useState(initialFormState)
  const [isFormValid, setIsFormValid] = useState(false)
  const sectionRef = useReveal<HTMLElement>()
  const revealDelay = (delay: number): CSSProperties =>
    ({ '--reveal-delay': `${delay}ms` }) as CSSProperties

  const buildValidations = (): Validations => {
    return {
      subject: {
        message: '',
        touched: false,
        label: 'Subject',
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

  const [validations, setValidations] = useState<Validations>(buildValidations)

  const updateForm = (input: 'subject' | 'message', text: string) => {
    const data = { ...form, [input]: text }
    setForm(data)

    const nextValidations: Validations = {
      subject: {
        ...validations.subject,
        touched: input === 'subject' ? true : validations.subject.touched,
        message: getValidationMessage(data.subject, 'subject', 60)
      },
      message: {
        ...validations.message,
        touched: input === 'message' ? true : validations.message.touched,
        message: getValidationMessage(data.message, 'message', 500)
      }
    }

    setValidations(nextValidations)
    setIsFormValid(
      data.subject.length > 0 &&
        data.message.length > 0 &&
        nextValidations.subject.message.length === 0 &&
        nextValidations.message.message.length === 0
    )
  }

  const sendMessage = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }

    if (!isFormValid) {
      return
    }

    openEmail()
  }

  const openEmail = () => {
    const subject = encodeURIComponent(form.subject)
    const message = encodeURIComponent(form.message)
    window.open(
      `mailto:aleixmp1379@gmail.com?subject=${subject}&body=${message}`,
      '_blank'
    )
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`${styles.section} ${styles.contactSection}`}
    >
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow} data-reveal style={revealDelay(0)}>
          LET&apos;S TALK
        </span>
        <h2 data-reveal style={revealDelay(90)}>
          Contact me
        </h2>
        <p className={styles.sectionLead} data-reveal style={revealDelay(180)}>
          Let&apos;s build something useful.
        </p>
      </div>

      <div className={styles.contactGrid}>
        <aside
          className={styles.contactIntro}
          data-reveal
          style={revealDelay(260)}
        >
          <h3>Open a conversation.</h3>
          <p>Send a message by email or connect through LinkedIn and Github.</p>
          <div className={styles.socialNetworks}>
            <IconLink
              link={{
                url: 'https://www.linkedin.com/in/aleixmp/',
                text: 'Linkedin',
                icon: 'linkedin'
              }}
              size={22}
              className={styles.socialLink}
            />
            <IconLink
              link={{
                url: 'https://github.com/Aleix1379',
                text: 'Github',
                icon: 'github'
              }}
              size={22}
              className={styles.socialLink}
            />
          </div>

          <img
            src="/images/contact.svg"
            alt="Contact"
            className={styles.imageContact}
            width={500}
            height={620}
          />
        </aside>

        <form
          data-testid="contact-form"
          className={styles.form}
          onSubmit={sendMessage}
          data-reveal
          style={revealDelay(360)}
        >
          <div className={styles.formIntro}>
            <h3>Write a quick message.</h3>
            <p>
              Use the form to open an email draft with your subject and message.
            </p>
          </div>
          <div className={styles.formFields}>
            <Input
              testID="contact-form-subject"
              className={styles.input}
              label={'Subject'}
              placeholder={'Project, role or collaboration'}
              value={form.subject}
              validation={validations.subject}
              onChange={text => updateForm('subject', text)}
            />
            <Input
              testID="contact-form-message"
              className={styles.input}
              label={'Message'}
              placeholder={'Share a few details about what you want to build.'}
              value={form.message}
              validation={validations.message}
              onChange={text => updateForm('message', text)}
              type={'textarea'}
            />
          </div>
          <SubmitForm
            className={`${styles.button} ${styles.submitButton}`}
            label={'Send message'}
            type="submit"
            disabled={!isFormValid}
          />
        </form>
      </div>
    </section>
  )
}

export default ContactSection
