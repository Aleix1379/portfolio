export const milliSecondsToTime = (t: number) => {
	let year = 0
	let month = 0
	let day = 0
	let hour = 0
	let minute = 0
	let second = 0

	second = Math.floor(t / 1000)
	minute = Math.floor(second / 60)
	second = second % 60
	hour = Math.floor(minute / 60)
	minute = minute % 60
	day = Math.floor(hour / 24)
	hour = hour % 24
	month = Math.floor(day / 30)
	day = day % 30
	year = Math.floor(month / 12)
	month = month % 12

	return { year, month, day, hour, minute, second }
}


export const getDifference = (start: string, end: string | null): string => {
	const startDate: Date = new Date(start)
	let endDate: Date = new Date()
	if (end) {
		endDate = new Date(end)
	}


	let diff: number = endDate.getTime() - startDate.getTime()
	if (endDate < startDate) {
		diff = startDate.getTime() - endDate.getTime()
	}

	const time = milliSecondsToTime(diff)

	let years = ''
	let months = ''

	if (time.year > 0) {
		years = `${time.year} years`
	}

	if (time.month > 0) {
		months = `${time.month} months`
	}

	return `${years} ${months}`
}

