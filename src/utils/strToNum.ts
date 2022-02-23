export const stringToNumber = (val: number | string) : number => {

	if (typeof val === 'string'){
		return parseInt(val)
	}
	return val
}