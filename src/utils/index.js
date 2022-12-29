export const ParseString = (arg) => {
    let text = arg?.replace(/&quot;/g, '"')
    return text?.replace(/&amp;/g, '&')

}
export const StringToNum = (arg) => {
    Number(arg)
}



export const getLanguageObject = () => {
    const language = 'Hindi,English,Punjabi,Telugu,Tamil,Bhojpuri,Bengali,Malayalam,Kannada,Marathi,Gujarati,Haryanvi,Urdu,Assamese,Rajasthani,Odia'
    const languageStrans = 'हिन्दी Hindi,English,ਪੰਜਾਬੀ Punjabi,తెలుగు Telugu,தமிழ் Tamil,भोजपुरी Bhojpuri,বাংলা Bengali,മലയാളം Malayalam,ಕನ್ನಡ Kannada,मराठी Marathi,ગુજરાતી Gujarati,हरयाणवी Haryanvi,اردو Urdu,অসমীয়া Assamese,राजस्थानी Rajasthani,ଓଡ଼ିଆ Odia'
    const arrkey = language.split(',')
    const arrvalue = languageStrans.split(',')
    const newval = arrkey.map((ele, ind) => {
        const obj = {
            name: ele,
            value: arrvalue[ind]
        }
        return obj
    })
    return newval
}


export const Consoletyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
