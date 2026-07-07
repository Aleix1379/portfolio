import type { ProjectInfo } from '../types/ProjectInfo'

export const getProjects = (limit = -1): Array<ProjectInfo> => {
  const data: Array<ProjectInfo> = [
    {
      id: '1',
      name: 'Vacation Flow',
      type: 'Backend · Internal tool',
      description:
        'Vacation management system for streamlining time-off requests and approvals with automated workflows.',
      problem:
        'Manual vacation and time-off approval processes are slow, hard to track, and error-prone.',
      role: 'Backend developer — built the NestJS API.',
      image: '/images/projects/vacation-flow.png',
      active: false,
      links: [
        {
          url: 'https://github.com/Aleix1379/vacation-flow-backend',
          text: 'Github',
          icon: 'github'
        }
      ],
      apps: [
        {
          id: '10',
          name: 'Vacation Flow',
          description:
            'NestJS backend API for user authentication, leave requests, and calendar integration.',
          platform: 'backend',
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
      type: 'Personal project · Web platform',
      description:
        'Social platform for gamers to showcase and discover PC setups with specs and community feedback.',
      problem:
        'No dedicated place for gamers to share and discover real PC setups.',
      role: 'Solo developer — Vue/Nuxt frontend and Node.js/GraphQL backend.',
      image: '/images/projects/my-setuppi.webp',
      active: true,
      links: [
        {
          url: 'https://www.mysetuppi.com/',
          text: 'Website',
          icon: 'web'
        }
      ],
      apps: [
        {
          id: '9',
          name: 'My Setuppi',
          description:
            'Nuxt web app for browsing, uploading and rating PC setups with user profiles.',
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
          ]
        },
        {
          id: '11',
          name: 'My Setuppi Backend',
          description:
            'Node.js GraphQL API for user profiles, setup posts, comments and ratings.',
          platform: 'backend',
          technologies: [
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            },
            {
              text: 'Node.js',
              url: 'https://nodejs.org/',
              icon: 'nodejs'
            },
            {
              text: 'GraphQL',
              url: 'https://graphql.org/',
              icon: 'graphql'
            },
            {
              text: 'Apollo',
              url: 'https://www.apollographql.com/',
              icon: 'apollographql'
            },
            {
              text: 'PostgreSQL',
              url: 'https://www.postgresql.org/',
              icon: 'postgres'
            },
            {
              text: 'Sequelize',
              url: 'https://sequelize.org/',
              icon: 'sequelize'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Enirve',
      type: 'Personal project · Mobile app',
      description:
        'Mobile app for learning English irregular verbs through exercises and progress tracking.',
      problem:
        'Learners struggle to memorize irregular verbs without short, consistent practice.',
      role: 'Solo developer — React Native app and Node.js/GraphQL backend, published on App Store and Google Play.',
      image: '/images/projects/enirve.webp',
      active: true,
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
      apps: [
        {
          id: '3',
          name: 'Enirve App',
          description:
            'React Native app for learning irregular verbs with exercises, quizzes and offline mode.',
          platform: 'mobile',
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
          description:
            'Node.js GraphQL API for user data, learning progress and verb database management.',
          platform: 'backend',
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
      type: 'Product experiment · Mobile app',
      description:
        'Community app for gamers to discuss, review and discover games.',
      problem:
        'Gamers lack a focused space to discuss games outside noisy general social apps.',
      role: 'Solo developer — React Native app and Kotlin/Spring Boot backend.',
      image: '/images/projects/talk-and-play.webp',
      active: true,
      links: [
        {
          url: 'https://github.com/Aleix1379/TalkAndPlayApp',
          text: 'Github',
          icon: 'github'
        }
      ],
      apps: [
        {
          id: '1',
          name: 'Talk And Play',
          description:
            'React Native app for gamers to create profiles, track activity and discuss games.',
          platform: 'mobile',
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
          description:
            'Kotlin and Spring Boot backend for user authentication, game data and social interactions.',
          platform: 'backend',
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
    return data.filter(project => project.active)
  }

  return data.filter(project => project.active).slice(0, limit)
}
