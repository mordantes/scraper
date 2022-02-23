import { Browser } from "puppeteer"
import { parseProductsFromPage } from "."
import { ParsedProduct } from "../@types"


export const parsePage = async (browser: Browser, uri : string) => {
	try{
		const result: ParsedProduct[] = []
		const page = await browser.newPage()
		await page.goto(uri, { waitUntil: "domcontentloaded" })

		const currentGoods = await parseProductsFromPage(page)

		const hasArrow = await page.evaluate(()=> {
			const isFlip:HTMLAnchorElement | null = document.querySelector('#right_block_ajax > div.inner_wrapper > div.ajax_load.cur.block > div.bottom_nav.animate-load-state.block-type > div.module-pagination > div > ul > li > a.flex-next')
			return isFlip && isFlip.href
		})
		await page.close()

		result.push(...currentGoods)

		if (hasArrow){
			const flipped = await parsePage(browser, hasArrow)
			result.push(...flipped)
			return result
		}
		return result
	}catch(e){
		throw e
	}	
}

