import React from 'react'
import { useState } from 'react'
import styles from '../styles/Header.module.css'
import Letter from './Letter'

const Header = () => {
  const [name] = useState("I'm Aleix.")
  const [description] = useState('A web developer.')

  const renderAnimatedText = (text: string, animationDelay = 0.25) => {
    return text.split(/(\s+)/).map((word, key) => (
      <div key={key} className={styles.word}>
        {word.split('').map((letter, index) => {
          const wordKey = key * 1.5
          const delay = ((wordKey + index) * 0.1 + animationDelay).toFixed(2)
          return (
            <Letter
              key={index}
              value={letter}
              style={{
                animationDelay: `${delay}s`,
                marginLeft: letter === ' ' ? 15 : 0
              }}
            />
          )
        })}
      </div>
    ))
  }

  return (
    <header id="header" className={styles.header}>
      <div>
        <h1 className={`${styles.name} ${styles.text}`}>
          {renderAnimatedText(name)}
        </h1>
        <h2 className={`${styles.name} ${styles.text}`}>
          {renderAnimatedText(description, 0.75)}
        </h2>
      </div>
    </header>
  )
}

export default Header
