


export declare type Shopname  = 'spar'

export declare type FileName = 'result' | 'products' | 'test'

export declare interface ParsedProduct {
	_id : number
	goodName: string
	link: string
	shopName : Shopname
	category: string
	price: {
		old: number | string
		new: number | string
	}
}

export declare interface MongoProduct extends Omit<ParsedProduct, 'price'>{
	offer: number | boolean
	actual: boolean;
	prices: {
        price: number;
        date: Date;
    }[],
}

export declare interface UlMenuList {
		uri: string
		subParagraph: boolean
	}

export interface LocalBase {
	text: ParsedProduct[]
	date: Date
	path: string
}