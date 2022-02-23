import {readdirSync, readFileSync, writeFileSync} from "fs";
import {resolve} from 'path'
import { compareProducts, saveProducts } from "../api";
import { LocalBase, MongoProduct, ParsedProduct } from "../../@types";
import { extractId, mongoDate, removeDuplicates, stopWatch } from "../utils";



export const offlineAnalyse = () => {
    let nested:ParsedProduct[] = []
    let test_nested:MongoProduct[] = []

    return async(path:string) => {
        try{
            const start = stopWatch(new Date())
            // read dir
            const dir = readdirSync(path)

            // resolve path to files
            const files = await Promise.all(
                dir
                    .map(file=> {
                        return {
                            path: resolve(path, file),
                            date: (file.match(/\d+[-]\d+[-]\d+/g) as RegExpMatchArray)
                                .toString()
                                .split("-")
                        }
                    })
            )
            // convert to mongo objects
            console.log('start reading')
            const jsonProducts:LocalBase[] = await Promise.all(files.map(async(props)=>{
                // read content
                const text:Omit<ParsedProduct, '_id'>[] = await JSON.parse(readFileSync(props.path, 'utf-8'))
                // set date from file path
                const [mm, dd, yy] = props.date
                const mongoDateTime = new Date(mongoDate(parseInt(dd), parseInt(mm), parseInt(yy)))
                // create product dto for mongo
                // const productsDto:fullProduct[] = text.map(t=> mongoProductDto(t, mongoDateTime))
                const productsDto = text.map(t=> ({...t, _id : extractId(t.link)}))
                // return array of objects with new field
                return {
                    ...props,
                    text: productsDto,
                    date: mongoDateTime
                }
            }))
            console.log('size is ',jsonProducts.length )
            console.log('start new test compare')
            const result = jsonProducts
                    .sort((a,b)=> a.date > b.date ? 1 : -1)
                    .reduce((tally:MongoProduct[], current:LocalBase):MongoProduct[] =>{
                        const products = current.text
                        console.log('start work with ', current.path, tally.length, current.text.length)
                        const compared = compareProducts(products, tally , current.date)
                        return compared
                    }, [])
                    .map(el=> 'shopName' in el ? el : {...el, shopName: 'spar'})
            const uniq = removeDuplicates(result)
            saveProducts(uniq.sort((a,b) => b.prices.length - a.prices.length) as MongoProduct[], 'test')
            console.log('done for ', start(new Date()))
           

        }catch(e){
            console.error(e)
        }
    }
}



offlineAnalyse()('base2')