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
    const langArr = [
        {
            name: 'Hindi',
            value: 'हिन्दी Hindi',
            firstAlphabet: 'अ'
        },
        {
            name: 'English',
            value: 'English',
            firstAlphabet: 'A'
        },
        {
            name: 'Punjabi',
            value: 'ਪੰਜਾਬੀ Punjabi',
            firstAlphabet: 'ਅ'
        },
        {
            name: 'Telugu',
            value: 'తెలుగు Telugu',
            firstAlphabet: 'అ'
        },
        {
            name: 'Tamil',
            value: 'தமிழ் Tamil',
            firstAlphabet: 'அ'
        },
        {
            name: 'Bhojpuri',
            value: 'भोजपुरी Bhojpuri',
            firstAlphabet: 'अ'
        },
        {
            name: 'Bengali',
            value: 'বাংলা Bengali',
            firstAlphabet: 'অ'
        },
        {
            name: 'Malayalam',
            value: 'മലയാളം Malayalam',
            firstAlphabet: 'അ'
        },
        {
            name: 'Kannada',
            value: 'ಕನ್ನಡ Kannada',
            firstAlphabet: 'ಅ'
        },
        {
            name: 'Marathi',
            value: 'मराठी Marathi',
            firstAlphabet: 'अ'
        },
        {
            name: 'Gujarati',
            value: 'ગુજરાતી Gujarati',
            firstAlphabet: 'અ'
        },
        {
            name: 'Haryanvi',
            value: 'हरयाणवी Haryanvi',
            firstAlphabet: 'अ'
        },
        {
            name: 'Urdu',
            value: 'اردو Urdu',
            firstAlphabet: 'ا'
        },
        {
            name: 'Assamese',
            value: 'অসমীয়া Assamese',
            firstAlphabet: 'অ'
        },
        {
            name: 'Rajasthani',
            value: 'राजस्थानी Rajasthani',
            firstAlphabet: 'अ'
        },
        {
            name: 'Odia',
            value: 'ଓଡ଼ିଆ Odia',
            firstAlphabet: 'ଅ'
        }
    ];

    return langArr
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
export const insertArrToSpecificIndex = (arr, index, newItem) => {
    if (newItem.length > 0) {
        newItem.map((item, ind) => {
            if (!arr.some(el => el.id === item.id)) {
                arr = [...arr.slice(0, index + ind), item, ...arr.slice(index + ind)];
                return arr
            }
        })
        return arr
        // return [...arr.slice(0, index), ...newItem, ...arr.slice(index)]
    }
    else {
        console.log("arr, index, newItem", arr, index, newItem);
        if (!arr.some(el => el.id === newItem.id)) {
            return [...arr.slice(0, index), newItem, ...arr.slice(index)]
        }
    }
}
export const isObject = obj => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
export function formatDate (isoDate) {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
export const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
};