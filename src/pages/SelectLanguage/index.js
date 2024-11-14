import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { configURL } from '../../apis/Base/config'
import { postRequestWithInstence } from '../../apis/Base/serviceMethods'
import { Icons } from '../../assets/Icons'
import CoustomCheckbox from '../../components/CostomCheckbox'
import SpotLoader from '../../components/Loader/SpotLoader'
import { getLanguageObject } from '../../utils'
import RouteStrings from '../../utils/RouteStrings'
import { loaclStorageStrings } from '../../utils/localStorageStrings'
import './style.scss'
const SelectLanguage = () => {
    const navigate = useNavigate()
    const [langArr, setLangArr] = useState([]);
    const [selectedLang, setSelectedLang] = useState([]);
    const profileInfo = JSON.parse(localStorage.getItem(loaclStorageStrings.profileInfo))
    useEffect(() => {

        setLangArr(getLanguageObject());
        if (profileInfo?.language?.length > 0) {
            setSelectedLang(profileInfo?.language)
        }
    }, [])
    const selectedLanArr = []
    const handleUpdateLang = (name, checked) => {
        if (checked) {
            selectedLanArr.push(name.toLowerCase())
        }
        if (checked === false) {
            const newValues = selectedLanArr.filter(val => {
                return val.toLowerCase() !== name.toLowerCase()
            })
            const localValues = selectedLang.filter(val => {
                return val.toLowerCase() !== name.toLowerCase()
            })
            const newArr = [...newValues, ...localValues,]
            setSelectedLang([...new Set(newArr)])
        }
    }
    const handleClick = () => {
        const newArr = [...selectedLang, ...selectedLanArr,]
        if (newArr.length === 0) {
            toast.error("Please Select a Language!..")
        } else {
            callAPI([...new Set(newArr)])
            // toast.success("Saved!..")
            // navigate(RouteStrings.home)
        }
    }

    const [isLoading, setIsLoading] = useState(false)

    const callAPI = async (arg) => {
        setIsLoading(true)
        const lang = {
            userId: profileInfo?._id,
            languages: arg
        }
        await postRequestWithInstence(configURL.setLanguages, lang).then(res => {
            if (res.status === 200) {
                localStorage.setItem(loaclStorageStrings.profileInfo, JSON.stringify(res.data.data))
                navigate(RouteStrings.home);
            }
            res.status !== 200 && toast.error(res.data.msg)
        }).catch(err => {
            console.log(err);
            toast.error("🤔 Somting not Correct")
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const matchedLangFromArr = (item) => {
        return selectedLang?.includes(item.toLowerCase())
    }
    return (
        <>
            <div className="pageWrapper">
                <div className="pageWrapper-topbar">
                    <button onClick={() => {
                        navigate(-1)
                    }} className='btn'>
                        <Icons.BsArrowLeft />
                    </button>
                    <button onClick={handleClick} className='btn btn-accent ml-3'> save</button>
                </div>
                <div className="mt-2 d-flex flex-row gap={2} flex-wrap justify-content-around align-ietems-center ">
                    {langArr?.map((data, ind) => {
                        return (
                            <>
                                <div key={ind} className="m-2">
                                    <CoustomCheckbox DefulatChecked={matchedLangFromArr(data?.name)} updateLanguage={handleUpdateLang} data={data} />
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            {
                isLoading && <div className="LoadingConatiner">
                    <SpotLoader />
                </div>
            }
            <Toaster position='bottom' />
        </>
    )
}

export default SelectLanguage