import { gradient } from "./data/inex"


export const ParseString = (arg) => {
    let text = arg?.replace(/&quot;/g, '"')
    return text?.replace(/&amp;/g, '&')
}
export const StringToNum = (arg) => {
    Number(arg)
}

export const getNamefromArray = (arr) => {
    if (typeof arr === 'object') {
        const name = []
        arr?.map(_ => {
            name.push(_?.name)
        })
        return ParseString(name.toString())
    }
    else { return ParseString(arr) }

}
export const getRandomGradients = () => {
    return `linear-gradient( ${gradient[Math.floor((Math.random() * gradient.length))].key})`;
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
export const filterFromLanguage = (arg) => {
    const langObj = getLanguageObject();
    let machedLangArr = []
    arg?.map(key => {
        const match = langObj.filter(val => {
            if (key.toLowerCase() === val.name.toLowerCase()) {
                return val
            }
        })
        machedLangArr = [...machedLangArr, ...match]

        return
    })
    // console.log("machedLangArr", machedLangArr);
    return machedLangArr
}
export const getSortedResposeObj = (res) => {
    let arranged = [];
    const newObj = []
    const newpositionsKey = Object.keys(res);
    const newpositionsValues = Object.values(res);
    newpositionsValues.map((item, ind) => {
        const ructObj = {
            ...item,
            type: newpositionsKey[ind]
        }
        newObj.push(ructObj)
    })
    newObj.sort(function (a, b) {
        //sort by x, secondary by y
        return a.position == b.position ? a.position - b.position : a.position - b.position;
    });
    for (let i = 0; i < newObj.length; i++) {

        //check if was already added
        if (typeof (newObj[i].wasAdded) == "undefined") {
            arranged.push(newObj[i]);
            newObj[i].wasAdded = "true";

            for (let j = i + 1; j < newObj.length; j++) {
                if (newObj[i].y > newObj[j].y && typeof (newObj[j].wasAdded) == "undefined") {
                    arranged.push(newObj[j]);
                    newObj[j].wasAdded = "true";
                }
            }
        }
    }
    return arranged
};
export const getCorrectSrc = (item) => {
    if (typeof item === 'object') {
        return item.length > 0 && item[item.length - 1].link
    }
    if (typeof item === 'string') {
        return item
    }
}
export function nFormatter (num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const Consoletyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
