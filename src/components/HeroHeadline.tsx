import React from 'react'
import type { CSSProperties } from 'react'
import styles from '../styles/HeroHeadline.module.css'

interface HeroHeadlineProps {
  lines: [string, string]
  className?: string
  lineClassName?: string
  secondLineClassName?: string
}

const LETTER_STAGGER_MS = 80
const LINE_DELAYS_MS = [680, 1160]

const getLetterStyle = (delay: number) =>
  ({
    '--letter-delay': `${delay}ms`
  }) as CSSProperties

const renderLine = (line: string, lineIndex: number) => {
  let characterIndex = 0

  return line.split(/(\s+)/).map((token, tokenIndex) => {
    if (/^\s+$/.test(token)) {
      characterIndex += token.length

      return ' '
    }

    const wordStartIndex = characterIndex
    characterIndex += token.length

    return (
      <span className={styles.word} key={`${lineIndex}-${tokenIndex}`}>
        {Array.from(token).map((letter, letterIndex) => {
          const delay =
            LINE_DELAYS_MS[lineIndex] +
            (wordStartIndex + letterIndex) * LETTER_STAGGER_MS

          return (
            <span
              className={styles.letter}
              key={`${lineIndex}-${tokenIndex}-${letterIndex}`}
              style={getLetterStyle(delay)}
            >
              {letter}
            </span>
          )
        })}
      </span>
    )
  })
}

const HeroHeadline: React.FC<HeroHeadlineProps> = ({
  lines,
  className,
  lineClassName,
  secondLineClassName
}) => {
  return (
    <h1 aria-label={lines.join(' ')} className={className}>
      <span aria-hidden="true" className={styles.visual}>
        {lines.map((line, lineIndex) => (
          <React.Fragment key={line}>
            <span
              className={`${lineClassName ?? ''} ${
                lineIndex === 1 ? (secondLineClassName ?? '') : ''
              }`.trim()}
            >
              {renderLine(line, lineIndex)}
            </span>
            {lineIndex < lines.length - 1 ? '\n' : null}
          </React.Fragment>
        ))}
      </span>
    </h1>
  )
}

export default HeroHeadline
