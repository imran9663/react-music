import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { configURL } from '../../apis/Base/config'
import { getRequest } from '../../apis/Base/serviceMethods'
import { Icons } from '../../assets/Icons'
import SearchingLoader from '../../components/Loader/SearchingLoader'
import MediaCard from '../../components/MediaCard'
import RoundCard from '../../components/RoundCard'
import { getSortedResposeObj } from '../../utils'
import './style.scss'
import axios from 'axios'
const Search = () => {
    const [searchedValue, setsearchedValue] = useState("")
    const [resultData, setresultData] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const [ReadOnly, setReadOnly] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            searchedValue !== "" && getSearchedData()
        }, 2000);
    }, [searchedValue])

    const getSearchedData = async () => {
        setisLoading(true)
        let url = new URL(process.env.REACT_APP_API_BASE_URL + configURL.searchAll);
        url.searchParams.set('query', searchedValue);
        await axios.get(url).then((res) => {
            if (res.data.data != null) {
                setresultData(getSortedResposeObj(res.data.data))
            } else {
                toast("No Data Found")
            }
        }).catch((err) => {
            toast.error("Someting went wrong from our side.")
        }).finally(() => {
            setisLoading(false)
        })
    }
    const handleChange = (e) => {
        const { value } = e.target
        setsearchedValue(value)
    }


    return (
        <>
            <div className="search_wrapper ">
                <div className="searchbar-wrapper">
                    <input readOnly={ReadOnly} onChange={handleChange} value={searchedValue} placeholder='search here...' type="text" className='input' name="" id="" />
                </div>
                <div className="search-result">
                    {
                        isLoading ?
                            <>
                                <SearchingLoader />
                            </> : <>
                                <div className="mt-2 ">
                                    {resultData.length > 0 && <>

                                        {resultData.map((item, ind) => {
                                            // if (ind === 0) { return getTopquerytype(item) }
                                            return (
                                                <>
                                                    {item?.results.length > 0 &&
                                                        <>
                                                        {console.log("item", item)}
                                                            <h5 key={ind} className='text-white searchHeading'>{item.type === 'topQuery' ? 'Top Results ' : item.type}</h5>
                                                        <div className={`result-data ${item.type === 'songs' ? "songs" : ""}`}>
                                                                {
                                                                    item?.results.map((val, kye) => {
                                                                        return (
                                                                            <MediaCard key={kye} Data={val} />
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            )
                                        })
                                        }

                                    </>}
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className="p-4">
                <div className="null opacity-0"></div>
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </>
    )
}

export default Search