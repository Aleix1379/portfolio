import type { ProjectInfo, AppInfo } from '../types/ProjectInfo'

export const getProjects = (limit = -1): Array<ProjectInfo> => {
  const data: Array<ProjectInfo> = [
    {
      id: '1',
      name: 'Vacation Flow',
      description: 'Backend service for vacation management application.',
      image: '/images/projects/vacation-flow.png',
      apps: [
        {
          id: '10',
          name: 'Vacation Flow',
          description: 'Backend service for vacation management application.',
          platform: 'backend',
          links: [
            {
              url: 'https://github.com/Aleix1379/vacation-flow-backend',
              text: 'Github',
              icon: 'github'
            }
          ],
          technologies: [
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            },
            {
              text: 'NestJS',
              url: 'https://nestjs.com/',
              icon: 'nestjs'
            },
            {
              text: 'PostgreSQL',
              url: 'https://www.postgresql.org/',
              icon: 'postgres'
            },
            {
              text: 'Jest',
              url: 'https://jestjs.io/',
              icon: 'jest'
            },
            {
              text: 'Node.js',
              url: 'https://nodejs.org/',
              icon: 'nodejs'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'My Setuppi',
      description: 'Web to share gaming and pc setup.',
      image: '/images/projects/my-setuppi.webp',
      apps: [
        {
          id: '9',
          name: 'My Setuppi',
          description: 'Web to share gaming and pc setup.',
          platform: 'web',
          technologies: [
            {
              text: 'Vue JS',
              url: 'https://vuejs.org/',
              icon: 'vue'
            },
            {
              text: 'Nuxt JS',
              url: 'https://nuxtjs.org/',
              icon: 'nuxt'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            },
            {
              text: 'CSS',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
              icon: 'css'
            }
          ],
          links: [
            {
              url: 'https://www.mysetuppi.com/',
              text: 'Website',
              icon: 'web'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Enirve',
      description: 'App to learn irregular verbs in English',
      image: '/images/projects/enirve.webp',
      apps: [
        {
          id: '3',
          name: 'Enirve App',
          description: 'Mobile app to learn irregular verbs in English',
          platform: 'mobile',
          links: [
            {
              url: 'https://apps.apple.com/es/app/enirve/id6447982551?l=en',
              text: 'App store',
              icon: 'appStore'
            },
            {
              url: 'https://play.google.com/store/apps/details?id=com.enirvemobile',
              text: 'Google play',
              icon: 'googlePlay'
            },
            {
              url: 'https://enirve.web.app/',
              text: 'Website',
              icon: 'web'
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
          name: 'Enirve Backend',
          description: 'Backend for Enirve.',
          platform: 'backend',
          links: [],
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
        }
      ]
    },
    {
      id: '4',
      name: 'Talk And Play',
      description: 'Platform to talk about video games',
      image: '/images/projects/talkandplay.webp',
      apps: [
        {
          id: '1',
          name: 'Talk And Play',
          description: 'Mobile app to talk about video games.',
          platform: 'mobile',
          links: [
            {
              url: 'https://github.com/Aleix1379/TalkAndPlayApp',
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
            }
          ]
        },
        {
          id: '2',
          name: 'Talk And Play',
          description: 'Backend for Talk and play.',
          platform: 'backend',
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
        }
      ]
    }
  ]

  if (limit === -1) {
    return data
  }

  return data.slice(0, limit)
}
