export const EMAIL = 'EMAIL'
export const REQUIRED = 'REQUIRED'
export const MIN_LENGTH = 'MIN_LENGTH'
export const MAX_LENGTH = 'MAX_LENGTH'
export const PASSWORD_COMPLEXITY = 'PASSWORD_COMPLEXITY'
export const PASSWORD_REPEAT = 'PASSWORD_REPEAT'

interface Constraints {
	key:
		| 'EMAIL'
		| 'REQUIRED'
		| 'MIN_LENGTH'
		| 'MAX_LENGTH'
		| 'PASSWORD_COMPLEXITY'
		| 'PASSWORD_REPEAT'
	value?: number
	fields?: string[]
}

export interface Validation {
	message: string
	touched: boolean
	constraints: Constraints[]
	label: string
}
