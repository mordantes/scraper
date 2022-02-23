export function removeDuplicates<Type>(
	array: Type[]
): Type[] {
		try {
			const stringifyObj = array.map((element) => JSON.stringify(element))

			const uniqObjArr = stringifyObj.filter((objStr, pos) => {
				return stringifyObj.indexOf(objStr) == pos
			})
			console.log("Replaced: " + array.length + ">" + uniqObjArr.length)
			// console.log('replaced id ' , uniqObjArr.filter(e=> stringifyObj.filter(t=> t === e).length > 1) )
			return uniqObjArr.map((element) => JSON.parse(element)) as Type[]
		} catch (e) {
			console.error(e)
			return array
		}
}

