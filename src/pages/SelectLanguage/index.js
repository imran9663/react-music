import React, { useEffect, useState } from 'react'
import { getLanguageObject } from '../../utils'
import CoustomCheckbox from '../../components/CostomCheckbox'
import './style.scss'
import { Icons } from '../../assets/Icons'
import { useNavigate } from 'react-router'
import { Toaster, toast } from 'react-hot-toast'
import RouteStrings from '../../utils/RouteStrings'
import { loaclStorageStrings } from '../../utils/localStorageStrings'
const SelectLanguage = () => {
    const navigate = useNavigate()
    const [langArr, setlangArr] = useState([]);
    const [selectedLang, setselectedLang] = useState([]);
    useEffect(() => {
        setlangArr(getLanguageObject());
        setselectedLang(JSON.parse(localStorage.getItem(loaclStorageStrings.lang)))
    }, [])
    const selectedlanArr = []
    const handleUpdateLang = (name, checked) => {
        if (checked) {
            selectedlanArr.push(name.toLowerCase())
        } else {
            setselectedLang(selectedLang.filter(val => {
                return val.toLowerCase() !== name.toLowerCase()
            }))
        }
    }
    const handleClick = () => {
        if (selectedLang === null) {
            localStorage.setItem(loaclStorageStrings.lang, JSON.stringify(selectedlanArr))
            toast.success("Saved!..")
        } else {
            const newArr = [...selectedLang, ...selectedlanArr,]
            localStorage.setItem(loaclStorageStrings.lang, JSON.stringify([...new Set(newArr)]))
            toast.success("Saved!..")
        }
        navigate(RouteStrings.home)
    }
    const machedLangFromArr = (item) => {
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
                    <button onClick={handleClick} className='btn btn-success ml-3'> save</button>
                </div>
                <div className="mt-2 d-flex flex-row gap={2} flex-wrap justify-content-around align-ietems-center ">
                    {langArr?.map(data => {
                        return (
                            <>
                                <div className="m-2">
                                    <CoustomCheckbox DefulatChecked={machedLangFromArr(data?.name)} updateLanguage={handleUpdateLang} data={data} />
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <Toaster position='bottom' />
        </>
    )
}

export default SelectLanguage