export type JobTypeKey = 'full-time' | 'freelance' | 'internship'

export type ExperienceMetaIconName =
  | 'briefcase'
  | 'freelance'
  | 'graduationCap'
  | 'mapPin'
  | 'globe'
  | 'layers'
  | 'server'

const jobTypeLabels: Record<JobTypeKey, string> = {
  'full-time': 'Full-time',
  freelance: 'Freelance',
  internship: 'Internship'
}

export const normalizeJobType = (type: string): JobTypeKey => {
  const normalized = type.toLowerCase().trim()

  if (normalized.includes('freelance')) {
    return 'freelance'
  }

  if (
    normalized.includes('intern') ||
    normalized.includes('practice') ||
    normalized.includes('trainee')
  ) {
    return 'internship'
  }

  return 'full-time'
}

export const getJobTypeLabel = (type: string): string => {
  return jobTypeLabels[normalizeJobType(type)]
}

export const getJobTypeIcon = (type: string): ExperienceMetaIconName => {
  const jobType = normalizeJobType(type)

  if (jobType === 'freelance') {
    return 'freelance'
  }

  if (jobType === 'internship') {
    return 'graduationCap'
  }

  return 'briefcase'
}

export const isRemoteLocation = (location: string): boolean =>
  /\bremote\b/i.test(location)

export const getLocationIcon = (location: string): ExperienceMetaIconName =>
  isRemoteLocation(location) ? 'globe' : 'mapPin'

export const getLocationMapsUrl = (location: string): string => {
  const query =
    location.replace(/\s*\([^)]*remote[^)]*\)/gi, '').trim() || location

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
