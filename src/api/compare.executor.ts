import { MongoProduct, ParsedProduct } from "../@types"
import {ProductModel} from '../models'
import { compareProducts, saveProducts } from "."
import {writeFileSync, readFileSync} from 'fs'
import { initMongoConnection } from "../utils/initConnection"


export const compareExecutor = async (parsed : ParsedProduct[], dt: Date) : Promise<void> => {
	try{
		await initMongoConnection()
		const dbProducts:MongoProduct[] = await ProductModel.find({})

		
		const compared: MongoProduct[] = compareProducts(parsed, dbProducts, dt)
		
		
		const deleteAll = await ProductModel.deleteMany()
	
		const mongoModels = await Promise.all(
			compared.map(async (product:MongoProduct)=>{
				return await new ProductModel(product)
			})
		)
		const bulkSave = await ProductModel.bulkSave(mongoModels)
		await saveProducts(compared, 'result')

		writeFileSync('mongoModels.json', JSON.stringify(mongoModels,null,4), 'utf-8')
		writeFileSync('compared.json', JSON.stringify(compared, null , 4) , 'utf-8')

		console.log('deleted - ', deleteAll)
		console.log(mongoModels.length, 'models')
		console.log('inserted - ' ,bulkSave.insertedCount)
		console.log(dbProducts.length, 'from BD')
		console.log(parsed.length, 'from site')
		console.log(compared.length, 'from comparing')
	}catch(e){
		console.log(e)
		throw e
	}
}

// compareExecutor(
// 	JSON.parse(readFileSync('base/products-14-3-2022.json', 'utf-8')),
// 	new Date()
// 	)