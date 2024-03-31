export type BrandIcon =
  'github'
  | 'linkedin'
  | 'web'
  | 'googlePlay'
  | 'appStore'
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
  | 'angular'
  | 'astro'
  | 'css'
  | 'vue'
  | 'nuxt'

export interface Link {
  url: string
  text: string
  icon: BrandIcon
}
