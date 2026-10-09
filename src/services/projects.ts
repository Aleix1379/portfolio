import type { ProjectInfo } from '../types/ProjectInfo'

export const getProjects = (limit = -1): Array<ProjectInfo> => {
  const data: Array<ProjectInfo> = [
    {
      id: '7',
      name: 'Arcblink',
      description:
        'A precision arcade game where players line up shots, use rebounds and compete in local, online and campaign modes.',
      image: '/images/projects/arcblink.png',
      active: true,
      links: [
        {
          url: 'https://arcblink.com/',
          text: 'Web',
          icon: 'web'
        },
        {
          url: 'https://play.google.com/store/apps/details?id=com.arcblink.game',
          text: 'Android',
          icon: 'googlePlay'
        }
      ],
      apps: [
        {
          id: '18',
          name: 'Arcblink Mobile',
          description:
            'Native iOS and Android game with local play, CPU matches, online multiplayer and campaign progression.',
          platform: 'mobile',
          technologies: [
            {
              text: 'Flutter',
              url: 'https://flutter.dev/',
              icon: 'flutter'
            },
            {
              text: 'Dart',
              url: 'https://dart.dev/',
              icon: 'dart'
            }
          ]
        },
        {
          id: '19',
          name: 'Arcblink Web',
          description:
            'Browser game built with React and Phaser, with local, CPU, campaign and online multiplayer modes.',
          platform: 'web',
          technologies: [
            {
              text: 'React',
              url: 'https://react.dev/',
              icon: 'react'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            }
          ]
        },
        {
          id: '20',
          name: 'Arcblink API',
          description:
            'Cloudflare Worker API using Hono, D1 and Better Auth for accounts, matchmaking and synchronized online games.',
          platform: 'backend',
          technologies: [
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            }
          ]
        }
      ]
    },
    {
      id: '1',
      name: 'Vacation Flow',
      description:
        'Vacation management system for streamlining time-off requests and approvals with automated workflows.',
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
      description:
        'Social platform for gamers to showcase and discover PC setups and hardware configurations.',
      image: '/images/projects/my-setuppi.webp',
      active: false,
      links: [
        {
          url: 'https://www.mysetuppi.com/',
          text: 'Web',
          icon: 'web'
        }
      ],
      apps: [
        {
          id: '9',
          name: 'My Setuppi',
          description:
            'Vue.js web app for browsing, uploading, and rating PC setups with user profiles and social features.',
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
            'Node.js backend with GraphQL API for managing user profiles, setup posts, comments, and ratings.',
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
      description:
        'Educational app for learning English irregular verbs with interactive exercises and progress tracking.',
      image: '/images/projects/enirve.webp',
      active: false,
      links: [
        {
          url: 'https://apps.apple.com/es/app/enirve/id6447982551?l=en',
          text: 'iOS',
          icon: 'appStore'
        },
        {
          url: 'https://play.google.com/store/apps/details?id=com.enirvemobile',
          text: 'Android',
          icon: 'googlePlay'
        },
        {
          url: 'https://enirve.web.app/',
          text: 'Web',
          icon: 'web'
        }
      ],
      apps: [
        {
          id: '3',
          name: 'Enirve App',
          description:
            'React Native mobile app for learning irregular verbs with exercises, quizzes, and offline mode.',
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
            'Node.js backend with GraphQL API for user data, learning progress, and verb database management.',
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
      description:
        'Community platform for gamers to discuss, review, and discover video games with personalized recommendations.',
      image: '/images/projects/talkandplay.webp',
      active: false,
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
            'React Native mobile app for gamers to create profiles, track activity, and participate in discussions about games.',
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
            'Kotlin and Spring Boot backend for user authentication, game data, and social interactions with RESTful API.',
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
    },
    {
      id: '5',
      name: 'Race Tracker',
      description:
        'Follow Formula 1, MotoGP and WRC with calendars, local session times, results, standings and custom alerts.',
      image: '/images/projects/race-tracker.png',
      active: true,
      links: [
        {
          url: 'https://motorsport.aleixmp.dev/marketing',
          text: 'Web',
          icon: 'web'
        },
        {
          url: 'https://apps.apple.com/us/app/race-tracker-motorsport/id6791225595',
          text: 'iOS',
          icon: 'appStore'
        },
        {
          url: 'https://play.google.com/store/apps/details?id=dev.aleixmp.motorsport',
          text: 'Android',
          icon: 'googlePlay'
        }
      ],
      apps: [
        {
          id: '12',
          name: 'Race Tracker Mobile',
          description:
            'iOS and Android app for following racing calendars, session results, championship standings and reminders.',
          platform: 'mobile',
          technologies: [
            {
              text: 'React Native',
              url: 'https://reactnative.dev/',
              icon: 'react'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            }
          ]
        },
        {
          id: '13',
          name: 'Race Tracker API',
          description:
            'Node.js and Hono API backed by SQLite and Drizzle ORM for calendars, results, standings and account features.',
          platform: 'backend',
          technologies: [
            {
              text: 'Node.js',
              url: 'https://nodejs.org/',
              icon: 'nodejs'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            }
          ]
        },
        {
          id: '14',
          name: 'Race Tracker Web',
          description:
            'Web app built with React and TanStack Start for following motorsport calendars and championship information.',
          platform: 'web',
          technologies: [
            {
              text: 'React',
              url: 'https://react.dev/',
              icon: 'react'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            }
          ]
        }
      ]
    },
    {
      id: '6',
      name: 'WishFetch',
      description:
        'Share gift wish lists so friends and family can reserve ideas, avoid duplicate gifts and keep the surprise for the recipient.',
      image: '/images/projects/wishfetch.png',
      active: true,
      links: [
        {
          url: 'https://wishfetch.com/',
          text: 'Web',
          icon: 'web'
        }
      ],
      apps: [
        {
          id: '15',
          name: 'WishFetch Mobile',
          description:
            'iOS and Android app for creating and sharing wish lists and privately reserving gifts.',
          platform: 'mobile',
          technologies: [
            {
              text: 'React Native',
              url: 'https://reactnative.dev/',
              icon: 'react'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            }
          ]
        },
        {
          id: '16',
          name: 'WishFetch API',
          description:
            'Bun and Hono backend with PostgreSQL and Drizzle ORM for accounts, wish lists and gift reservations.',
          platform: 'backend',
          technologies: [
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            },
            {
              text: 'PostgreSQL',
              url: 'https://www.postgresql.org/',
              icon: 'postgres'
            }
          ]
        },
        {
          id: '17',
          name: 'WishFetch Web App',
          description:
            'Nuxt and Vue web app for creating, sharing and managing wish lists.',
          platform: 'web',
          technologies: [
            {
              text: 'Vue',
              url: 'https://vuejs.org/',
              icon: 'vue'
            },
            {
              text: 'Nuxt',
              url: 'https://nuxt.com/',
              icon: 'nuxt'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
            }
          ]
        },
        {
          id: '21',
          name: 'WishFetch Landing',
          description:
            'Landing page introducing WishFetch and showing how shared wish lists help friends and family choose gifts without duplicates or spoilers.',
          platform: 'landing',
          technologies: [
            {
              text: 'Astro',
              url: 'https://astro.build/',
              icon: 'astro'
            },
            {
              text: 'TypeScript',
              url: 'https://www.typescriptlang.org/',
              icon: 'typescript'
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
