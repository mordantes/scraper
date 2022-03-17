import {  MongoProduct , ParsedProduct} from "../@types";
import { compareDate , stringToNumber} from "../utils";

export const compareProducts = (parsed : ParsedProduct[], nested: MongoProduct[], date: Date) : MongoProduct[] => {
			if (nested.length === 0 ) {
				return parsed.map((product:ParsedProduct) :MongoProduct=> {
					const {price, ...other} = product
					return {
						...other, 
						actual: compareDate(date, new Date()),
						offer: extractPrice(price, "new"),
						prices: [{
								price: extractPrice(price, "old"),
								date: date
							}],
					}
				})
			}else{
				return parsed.map((product: ParsedProduct) : MongoProduct=> {
					const exists = findById<MongoProduct>(nested, product._id)
					const {price, ...other} = product
					if (!exists){
							return {
								...other,
								actual: compareDate(date, new Date()),
								offer: extractPrice(price, "new"),
								prices: [{
									price: extractPrice(price, "old"),
									date: date
								}],
							}
					}else{
						const {prices} = exists
						const existPrice = prices.some(val=> val.price === extractPrice(product.price, "old"))	
						const newOnePrices = !existPrice ? [
							...exists.prices,
							{
								price: extractPrice(product.price, "old"),
								date: date
							}
						]: exists.prices
						return {	
							...other,					
							actual: compareDate(date, new Date()) ,
							offer: extractPrice(product.price, "new") || false,
							prices: newOnePrices.sort((a,b)=> a.date > b.date ? 1 : -1)
						}
					}					
			})
		}
}




const findById = <T>(array:T[],id: number) : false | T=> {
    const target = array.find((elem:any) => elem._id === id)
    if (!target) return false
    return target
}

export const extractPrice = (price: string |  { old: string | number, new: string | number} , field : 'old' | 'new') => {
	return typeof price === 'object' ? stringToNumber(price[field]) : stringToNumber(price)
}





			// return nested.map((product:MongoProduct) =>{				
			// 	const exists = findById<ParsedProduct>(parsed, product._id)
				
			// 	if (!exists){
			// 		return product
			// 	}else{
			// 		const {price, ...otherProps} = exists
			// 		const existPrice = product.prices.some(val=> val.price === extractPrice(price, "old"))
			// 		const newOnePrices = !existPrice ? product.prices.concat([
			// 			{ 
			// 				price: extractPrice(price, "old"),
			// 				date: date
			// 			}
			// 		]) : product.prices
			// 		const newOne = {	
			// 			...otherProps,					
			// 			actual: compareDate(date, new Date()) ,
			// 			offer: extractPrice(price, "new") || false,
			// 			prices: newOnePrices.sort((a,b)=> a.date > b.date ? 1 : -1)
			// 		}
			// 		return newOne
			// 	}
			// })