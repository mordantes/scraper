require("dotenv").config()
const configStore = process.env
import puppeteer from "puppeteer";
import { compareExecutor,  executor, parseMenu, saveProducts } from ".";
import { ParsedProduct, Shopname, UlMenuList } from "../@types";
import { removeDuplicates } from "../utils";
import { InitMailer } from "./tlgrm.send";



export default async function Main(shopname:Shopname) {
	 //* In the future we add new traders to scrape
	switch(shopname){
		case 'spar' :  {
			try{
				// create instance of browser
				const browser = await puppeteer.launch({
					headless: true,
					defaultViewport: {
						width: 1920,
						height: 1080,
					},
				})
				// turn into shop URL
				const page = await browser.newPage()
				await page.goto(configStore.SPAR_URL as string, { waitUntil: "domcontentloaded" })
				// get categories from site 
				const categories : UlMenuList[] = await parseMenu(page)
				// await page.close()
				await page.close()
				// To increase api speed we start scraping in 2 copy of browsers
				const first = [
					...categories.slice(0,4), 
					...categories.slice(16,24),
				]

				const second = [
					...categories.slice(4,16), 
				]
				// get products from parsed categories in 2 work flows
				const products = await Promise.all([
					executor(browser,first, 'first worker'),
					executor(browser,second, 'second worker')
				])
				// concat 2 arrays into result one 
				const total = await Promise.all(
					products.reduce((tally, curr) => {
						 tally.push(...curr)
						 return tally
					}, [])
				)
				// on target shop some products have many categories, replace them
				const uniq = removeDuplicates<ParsedProduct>(total, '_id')
				// save data locally (optional)
				await saveProducts(uniq, 'products')
				// compare collected data with one stored in database 
				await compareExecutor(uniq, new Date())
				await InitMailer()
			}catch(e){
				console.log(e)
			}
		}
		default : return null
	}
}