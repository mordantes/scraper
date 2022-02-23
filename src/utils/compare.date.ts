
export const compareDate = (dts: Date, dte: Date) : boolean => {
	const dayStart = dts.getDate()
	const monthStart = dts.getMonth()
	const yearStart = dts.getFullYear()

	const dayEnd = dte.getDate()
	const monthEnd = dte.getMonth()
	const yearEnd = dte.getFullYear()

	// console.log(dayStart === dayEnd && monthEnd === monthStart && yearEnd === yearStart)

	return dayStart === dayEnd && monthEnd === monthStart && yearEnd === yearStart
}