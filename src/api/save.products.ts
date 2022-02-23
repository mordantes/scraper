import { FileName, MongoProduct, ParsedProduct } from "../@types"
import {writeFileSync}  from 'fs'
import genFilename from "../utils/gen.filename"
import { resolve } from 'path'



export async function saveProducts(data: MongoProduct[] | ParsedProduct[]  , filename:FileName){
	try{
		if (process.env.BACKUP_DIR){
			writeFileSync(
				resolve(process.env.BACKUP_DIR, genFilename(new Date(), filename )),
				JSON.stringify(data, null, 4),
				'utf-8'
			)
		}else throw new Error('must declare path to local store')
	}catch(e){
		// console.log(e)
		throw e
	}
}