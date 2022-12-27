export const ParseString = (arg) => {
    return arg?.replace(/&quot;/g, '"')
    if (arg.includes('&quot;')) {
    }
    if (arg.includes('&amp;')) {
        return arg?.replace(/&amp;/g, '"')
    }
    return arg
}
export const StringToNum = (arg) => {
    Number(arg)
}

