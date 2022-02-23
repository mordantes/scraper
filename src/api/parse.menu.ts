import {Page} from "puppeteer";
import { UlMenuList } from "../@types";


export const parseMenu = async(page: Page) :Promise<UlMenuList[]> => {
    try{
        return await page.evaluate(() => {
            const hrefs = document.querySelectorAll("div.catalog_block ul.dropdown li.m_line.v_hover") as NodeListOf<HTMLUListElement>
            return Array.from(hrefs).map((node: HTMLUListElement) => {
                if (node.classList.contains('has-child')) {
                    return {
                        uri: "https://" + document.domain + (node.firstElementChild as Element).getAttribute('href'),
                        subParagraph: true
                    }
                } else {
                    return {
                        uri: "https://" + document.domain + (node.firstElementChild as Element).getAttribute('href'),
                        subParagraph: false
                    }
                }
            })
        })
    }catch(e){
        throw e
    }
}