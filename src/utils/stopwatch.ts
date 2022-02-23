
export const stopWatch = (startTime: Date) => (endTime: Date) =>
	`Exec time is ${(endTime.getTime() - startTime.getTime()) / 1000} seconds.`
