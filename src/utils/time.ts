import { getExperience } from '../services/experience.ts'
import type { JobExperience } from '../types/JobExperience.js'
import type { JobOptions } from '../types/JobExperience.js'
import type { TimeOptions } from '../types/Time.js'

export const milliSecondsToTime = (t: number) => {
  let month
  let day
  let hour
  let minute
  let second

  second = Math.floor(t / 1000)
  minute = Math.floor(second / 60)
  second = second % 60
  hour = Math.floor(minute / 60)
  minute = minute % 60
  day = Math.floor(hour / 24)
  hour = hour % 24
  month = Math.floor(day / 30)
  day = day % 30
  const year = Math.floor(month / 12)
  month = month % 12

  return { year, month, day, hour, minute, second }
}

export const getDifference = (start: string, end: string | null): string => {
  // Employment ranges count both calendar months, as on LinkedIn. Parse the
  // written month directly so time zones and month length cannot shift it.
  const monthIndex = (value: string) => {
    const match = /^(\d{4})-(\d{2})(?:-|$)/.exec(value)
    if (!match || Number(match[2]) < 1 || Number(match[2]) > 12) {
      throw new RangeError('Employment dates must include a valid year and month')
    }
    return Number(match[1]) * 12 + Number(match[2]) - 1
  }
  const now = new Date()
  const endMonth = end
    ? monthIndex(end)
    : now.getFullYear() * 12 + now.getMonth()
  const totalMonths = Math.abs(endMonth - monthIndex(start)) + 1
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts = []
  if (years) parts.push(`${years} year${years === 1 ? '' : 's'}`)
  if (months) parts.push(`${months} month${months === 1 ? '' : 's'}`)
  return parts.join(' and ')
}

export const formatDateWithMonthName = (
  value: string,
  options?: TimeOptions
) => {
  if (!options) {
    options = {
      day: true,
      month: true,
      year: true,
      short: false
    }
  }

  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ]
  const date: Date = new Date(value)

  const monthName = months[date.getMonth()]
  let monthLimit = monthName.length
  if (options.short) {
    monthLimit = 3
  }

  let result = ''
  if (options.day) {
    result += ` ${date.getDate()}`
  }
  if (options.month) {
    result += ` ${monthName.substring(0, monthLimit)}`
  }
  if (options.year) {
    result += ` ${date.getFullYear()}`
  }

  return result
}

export const getYearsOfExperience = (options?: JobOptions): number => {
  let years = 0
  let months = 0
  let filter = null
  let jobs: Array<JobExperience> = getExperience()

  if (options) {
    filter = options.filter
  }

  const typeFilter: Array<string> = []

  if (filter) {
    if (filter.fullTime) {
      typeFilter.push('full-time')
    }

    if (filter.freelance) {
      typeFilter.push('freelance')
    }

    if (filter.internship) {
      typeFilter.push('internship')
    }

    jobs = jobs.filter(job => typeFilter.includes(job.type))
  }

  jobs.forEach(job => {
    const start = new Date(job.start)
    const end = new Date(job.end ?? new Date())

    let diff: number = end.getTime() - start.getTime()
    if (end < start) {
      diff = start.getTime() - end.getTime()
    }
    const time = milliSecondsToTime(diff)
    years += time.year
    months += time.month
  })

  years = Math.floor(years + months / 12)

  return years
}
