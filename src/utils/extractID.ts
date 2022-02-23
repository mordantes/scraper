

export const extractId = (uri: string) => {
    const match = uri.match(/\/\d+\/$/g) as RegExpMatchArray
    return parseInt(match[0].replace(/\//g,''))
}


