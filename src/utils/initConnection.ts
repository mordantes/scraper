require("dotenv").config()
import { connect } from "mongoose"
const configStore = process.env
const uri = `mongodb+srv://${configStore.MONGO_USER}:${configStore.MONGO_PWD}@cluster0.fitvd.mongodb.net/${configStore.MONGO_DB}?retryWrites=true&w=majority`


async function initDbConnection(){
	try{
		return await connect(uri)
	}catch(e){
		throw e
	}
}


export const initMongoConnection = initDbConnection