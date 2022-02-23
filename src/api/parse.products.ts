import {Page} from "puppeteer"
import {ParsedProduct} from "../@types"
import { extractId } from "../utils"

export async function parseProductsFromPage(
    page: Page
): Promise<ParsedProduct[]> {
    try{
        const products: Omit<ParsedProduct, '_id'>[] =  await page.evaluate(() => {
            try{
                const price: Omit<ParsedProduct, '_id'>[] = []
                const goods = document.querySelectorAll(".item_info")
                for (let i = 0; i < goods.length; i++) {
                    const prices = goods[i].children[2].children
                    const goodLink = ("https://" +
                        document.domain +
                        goods[i].children[0].firstElementChild?.getAttribute("href")) as string
                    if (prices.length === 1) {
                        price.push({
                            goodName: (
                                goods[i].children[0].children[0].textContent as string
                            ).replace(/\s$/, ""),
                            price: {
                                old: parseInt(goods[i].children[2].children[0].children[1].children[0]
                                    .children[0].textContent as string),
                                new: 0,
                            },
                            link: goodLink,
                            category: document.querySelector("#pagetitle")?.innerHTML as string,
                            shopName: 'spar'
                        })
                    } else {
                        price.push({
                            goodName: (
                                goods[i].children[0].children[0].textContent as string
                            ).replace(/\s$/, ""),
                            price: {
                                old: parseInt(goods[i].children[2].children[0].children[1].children[0]
                                    .children[0].textContent as string),
                                new: parseInt(goods[i].children[2].children[1].children[1].children[0]
                                    .children[0].textContent as string),
                            },
                            link: goodLink,
                            category: document.querySelector("#pagetitle")?.innerHTML as string,
                            shopName: 'spar'
                        })
                    }
                }
                return price
            }catch(e){
                throw e
            }
 
        })
        return products.map((e) => ({...e, _id : extractId(e.link)}))
    }catch(e){
        throw e
    }
  
}
