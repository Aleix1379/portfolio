import React from "react";
import { useState } from 'react'
import styles from '../styles/Header.module.css'
import Letter from './Letter'

const Header = () => {
  const [name] = useState('I\'m Aleix.')
  const [description] = useState('A full stack developer.')

  const renderAnimatedText = (text: string, animationDelay = .25) => {
    return text.split(/(\s+)/).map((word, key) => (
      <div key={key} className={styles.word}>
        {
          word
            .split('')
            .map((letter, index) => {
              const wordKey = key * 1.5
              const delay = (((wordKey + index) * .1) + animationDelay).toFixed(2)
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
            })
        }
      </div>
    ))
  }

  return (
    <div id='header' className={styles.header}>
      <div>
        <h2 className={`${styles.name} ${styles.text}`}>
          {renderAnimatedText(name)}
        </h2>
        <h2 className={`${styles.name} ${styles.text}`}>
          {renderAnimatedText(description, .75)}
        </h2>
      </div>
    </div>
  )
}

export default Header
