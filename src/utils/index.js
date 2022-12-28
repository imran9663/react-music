export const ParseString = (arg) => {
    let text = arg?.replace(/&quot;/g, '"')
    return text?.replace(/&amp;/g, '&')

}
export const StringToNum = (arg) => {
    Number(arg)
}

export const Consoletyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
