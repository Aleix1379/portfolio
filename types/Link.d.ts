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

export interface Link {
	url: string
	text: string
	icon: BrandIcon
}
