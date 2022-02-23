import puppeteer, { Browser } from "puppeteer"
import { parsePage } from "."
import { ParsedProduct, UlMenuList } from "../@types"
import {stopWatch} from '../utils'



/** 
 * Require 
		@uriArray UlMenuList[]
		@workerName string 
	
 * Return 
		@result  Product[]

*/

export const executor = async (browser : Browser, uriArray : UlMenuList[], workerName: string) => {
	try{
		const result: ParsedProduct[] = [] 
		// console.log('parse execuitor ')
		
		for (const menuLink of uriArray){
			const menuTime = stopWatch(new Date())
			const goods = await parsePage(browser, menuLink.uri)
			const viewedResult = {
				execDate : menuTime(new Date()),
				targetUrl :  menuLink.uri,
				parsedSize : goods.length,
				currentPlace : uriArray.indexOf(menuLink) + 1 ,
				totalSize: uriArray.length,
				workerName
			}
			console.log(JSON.stringify(viewedResult, null, 4))
			result.push(...goods)
		}
		return result

	}catch(e){
		// console.log(e)
		throw e 
	}

}
