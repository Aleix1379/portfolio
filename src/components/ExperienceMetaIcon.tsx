import React from 'react'
import type { ExperienceMetaIconName } from '../utils/experienceMeta'

interface ExperienceMetaIconProps {
  name: ExperienceMetaIconName
  className?: string
}

const paths: Record<ExperienceMetaIconName, string> = {
  briefcase:
    'M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3Zm2-1h2v1h-2V5Zm-5 3v10h12V8H6Z',
  freelance:
    'M17.5 4.5 19 6l-8.2 8.2-2.5.8.8-2.5L17.5 4.5ZM6.8 13.5l2.7 2.7-1.4 1.4-2.7-2.7 1.4-1.4ZM15 3l2 2-1.4 1.4-2-2L15 3ZM5 19h3.8l8.7-8.7-3.8-3.8L5 15.2V19Z',
  graduationCap:
    'M12 3 2 8.5 12 14l8.2-4.4V16h1.8V8.5L22 8.5 12 3Zm0 8.2L5.4 8.5 12 5.8l6.6 2.7L12 11.2ZM4 17.5v2.2L12 22l8-2.3v-2.2l-8 2.3-8-2.3Z',
  mapPin:
    'M12 2a5 5 0 0 0-5 5c0 3.9 5 11 5 11s5-7.1 5-11a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z',
  globe:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.9 9h-3.3a12.4 12.4 0 0 0-1.1-4.3A8.1 8.1 0 0 1 19.9 11ZM12 4c.9 1.4 1.6 3.1 1.9 5H10c.3-1.9 1-3.6 1.9-5ZM8.5 6.7A12.4 12.4 0 0 0 7.4 11H4.1a8.1 8.1 0 0 1 4.4-4.3ZM4.1 13h3.3c.2 1.5.6 3 1.1 4.3A8.1 8.1 0 0 1 4.1 13Zm7.9 7c-.9-1.4-1.6-3.1-1.9-5h3.8c-.3 1.9-1 3.6-1.9 5Zm3.6-1.7c.5-1.3.9-2.8 1.1-4.3h3.3a8.1 8.1 0 0 1-4.4 4.3Z',
  layers:
    'M12 2 2 7l10 5 10-5-10-5Zm0 7.3L4.24 5.74 12 9.52l7.76-3.78L12 9.3Zm-10 3.7 10 5 10-5M2 16l10 5 10-5',
  server:
    'M4 4h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 10h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Zm2 2v2h2v-2H6Zm0-10v2h2V6H6Z'
}

const ExperienceMetaIcon: React.FC<ExperienceMetaIconProps> = ({
  name,
  className
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={paths[name]} />
  </svg>
)

export default ExperienceMetaIcon
