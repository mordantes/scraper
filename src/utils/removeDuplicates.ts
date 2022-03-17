import { writeFileSync} from 'fs'

export function removeDuplicates<Type>(
	array: Type[],
	f : keyof Type
): Type[] {
		try {
			const copyArray = array.map(e=> e[f])

			const fix = copyArray.filter((elem , pos) => {
				return copyArray.indexOf(elem) === pos
			})

			const result : Type[] = []

			for (const id of fix){
				const target = array.find(e=> e[f] === id)
				if (target){
					result.push(target)
				}
			}
			// console.log(array.length, ' > replaced to > ' , result.length)
			writeFileSync('123.json', JSON.stringify(result, null, 4 ) , 'utf-8')
			return result


			// const stringifyObj = array.map((element) => JSON.stringify(element[f]))
			// const stringifyObj = array.map((element) => element[f])

			// const uniqObjArr = stringifyObj.filter((objStr, pos) => {
			// 	return stringifyObj.indexOf(objStr._id) == pos
			// })
			// console.log("Replaced: " + array.length + ">" + uniqObjArr.length)
			// console.log('replaced id ' , uniqObjArr.filter(e=> stringifyObj.filter(t=> t === e).length > 1) )
			// return uniqObjArr.map((element) => JSON.parse(element)) as Type[]
		} catch (e) {
			// console.error(e)
			return array
		}
}

