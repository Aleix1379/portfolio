export type BrandIcon =
	'github'
	| 'linkedin'
	| 'web'
	| 'googlePlay'
	| 'react'
	| 'redux'
	| 'nodejs'
	| 'postgres'
	| 'graphql'
	| 'typescript'
	| 'apollographql'
	| 'kotlin'
	| 'mysql'
	| 'springBoot'
	| 'hibernate'
	| 'jest'
	| 'sequelize'
	| 'nextjs'
	| 'css3'
	| 'html5'

export interface Link {
	url: string
	text: string
	icon: BrandIcon
}
