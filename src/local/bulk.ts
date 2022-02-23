require("dotenv").config()
import { connect } from "mongoose"
import {ProductModel} from '../models'
import {readFileSync} from 'fs'
import { MongoProduct } from "../../@types"


const configStore = process.env
const uri = `mongodb+srv://${configStore.MONGO_USER}:${configStore.MONGO_PWD}@cluster0.fitvd.mongodb.net/${configStore.MONGO_DB}?retryWrites=true&w=majority`


export const bulkLocalData = async () => {

	try{
		await connect(uri)
		const deleteAll = await ProductModel.deleteMany()
		console.log('deleted - ', deleteAll)
		const data:MongoProduct[] = JSON.parse(readFileSync('base/test-23-2-2022.json', 'utf-8'))
		const newModel = await Promise.all(data.map(el=> new ProductModel(el)))
		const bulkSave = await ProductModel.bulkSave(newModel)
		console.log('inserted - ' ,bulkSave.insertedCount)


	}catch(e){
		console.log(e)
		throw e
	}
}

bulkLocalData()