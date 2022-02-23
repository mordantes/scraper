import { FileName } from "../@types";




export default function genFilename(dt: Date, fileName : FileName){
	return `${fileName}-${dt.getDate()}-${dt.getMonth()+1}-${dt.getFullYear()}.json`
}