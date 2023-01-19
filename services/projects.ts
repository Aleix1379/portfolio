import { ProjectInfo } from '../types/Project.Infod'

export const getProjects = (limit = -1): Array<ProjectInfo> => {
	const data: Array<ProjectInfo> = [
		{
			id: '7',
			name: 'Enirve Landing',
			description: 'Landing page for Enirve',
			platform: 'web',
			image: '/images/projects/enirve.webp',
			technologies: [
				{
					text: 'Astro',
					url: 'https://astro.build/',
					icon: 'astro'
				},
				{
					text: 'CSS',
					url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
					icon: 'css'
				},
				{
					text: 'React JS',
					url: 'https://reactjs.org/',
					icon: 'react'
				},
				{
					text: 'TypeScript',
					url: 'https://www.typescriptlang.org/',
					icon: 'typescript'
				}
			],
			links: [
				{
					url: 'https://enirve.com',
					text: 'Website',
					icon: 'web'
				}
			]
		},
		{
			id: '3',
			name: 'Enirve',
			description: 'Mobile app to learn irregular verbs in English',
			platform: 'mobile',
			image: '/images/projects/enirve.webp',
			links: [
				{
					url: 'https://play.google.com/store/apps/details?id=com.enirvemobile',
					text: 'Google play',
					icon: 'googlePlay'
				},
				{
					url: 'https://enirve.com',
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
			id: '5',
			name: 'Travels & Trips',
			description: 'Prototype mobile app abouts trips.',
			platform: 'mobile',
			image: '/images/projects/tratrip.webp',
			links: [
				{
					url: 'https://play.google.com/store/apps/details?id=com.aleixmp.tratripmobileapp',
					text: 'Google play',
					icon: 'googlePlay'
				},
				{
					url: 'https://github.com/Aleix1379/TraTripMobileApp',
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
					url: 'https://jestjs.io/',
					text: 'Jest',
					icon: 'jest'
				}
			]
		},
		{
			id: '6',
			name: 'Portfolio',
			description: 'Web to show my projects and opportunity to learn NextJS.',
			platform: 'web',
			image: '/images/projects/portfolio.webp',
			links: [
				{
					url: 'https://github.com/Aleix1379/portfolio',
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
					url: 'https://www.w3.org/Style/CSS/Overview.en.html',
					text: 'CSS 3',
					icon: 'css3'
				},
				{
					url: 'https://nextjs.org/',
					text: 'NextJS',
					icon: 'nextjs'
				},
				{
					url: 'https://reactjs.org/',
					text: 'React',
					icon: 'react'
				}
			]
		},
		{
			id: '4',
			name: 'Enirve',
			description: 'Backend for Enirve.',
			platform: 'backend',
			image: '/images/projects/enirve.webp',
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
		},
		{
			id: '1',
			name: 'Talk And Play',
			description: 'Mobile app to talk about video games.',
			platform: 'mobile',
			image: '/images/projects/talkandplay.webp',
			links: [],
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
			image: '/images/projects/talkandplay.webp',
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
		},
		{
			id: '7',
			name: 'Spotify player',
			description: 'Web app to list and play your favourite music from spotify.',
			platform: 'web',
			image: '/images/projects/spotify.png',
			links: [
				{
					url: 'https://github.com/Aleix1379/SpotiViewer',
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
					url: 'https://angular.io/',
					text: 'Angular',
					icon: 'angular'
				},
				{
					url: 'https://html.spec.whatwg.org/multipage/',
					text: 'HTML 5',
					icon: 'html5'
				},
				{
					url: 'https://www.w3.org/Style/CSS/Overview.en.html',
					text: 'CSS 3',
					icon: 'css3'
				}
			]
		}
	]

	if (limit === -1) {
		return data
	}

	return data.slice(0, limit)
}
