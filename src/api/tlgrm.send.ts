import { Telegraf } from "telegraf";
import { ChatIds } from "../models";
import { initMongoConnection } from "../utils/initConnection";


export const InitMailer = async() => {
	await initMongoConnection()
	const pp2p = new Telegraf(process.env.TLGRM_API_KEY as string)
	pp2p.launch()
	const allChats = await ChatIds.find() 
	allChats.map(e=>{
		pp2p.telegram.sendMessage(e.chatId, 'Product\'s database updated!')
	})
}