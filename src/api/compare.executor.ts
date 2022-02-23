require("dotenv").config()
import { ParsedProduct } from "../@types"
import { connect } from "mongoose"
import {ProductModel} from '../models'
import { compareProducts, saveProducts } from "."
import {writeFileSync} from 'fs'
import {resolve} from 'path'

const configStore = process.env
const uri = `mongodb+srv://${configStore.MONGO_USER}:${configStore.MONGO_PWD}@cluster0.fitvd.mongodb.net/${configStore.MONGO_DB}?retryWrites=true&w=majority`



export const compareExecutor = async (parsed : ParsedProduct[], dt: Date) : Promise<void> => {

	try{
		await connect(uri)
		const dbProducts = await ProductModel.find()
		const compared =  compareProducts(parsed, dbProducts, dt)
		console.log(dbProducts.length, compared.length)
		const deleteAll = await ProductModel.deleteMany()
		console.log('deleted - ', deleteAll)
		const newModel = await Promise.all(compared.map(el=> new ProductModel(el)))
		const bulkSave = await ProductModel.bulkSave(newModel)
		console.log('inserted - ' ,bulkSave.insertedCount)

		await saveProducts(compared, 'result')

	}catch(e){
		// console.log(e)
		throw e
	}
}