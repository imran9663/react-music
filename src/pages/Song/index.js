import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { getRequest } from '../../apis/Base/serviceMethods';
import { configURL } from '../../apis/Base/config';
import Loader from '../../components/Loader/Index';
import GlobalPlayer from '../../components/GlobalPlayer';
import Data from './data.json'

const Song = () => {
    const location = useLocation();
    const { url } = location.state

    const [songData, setsongData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        // getSongDetails()
        console.log("data", Data);
    }, [])
    const getSongDetails = async () => {
        setisLoading(true);
        await getRequest(configURL.song + url).then(res => {
            console.log("res", res.data.data);
            setsongData(res.data.data);
        }).catch(err => {
            console.log("getSongDetails err", err);
        }).finally(() => {
            setisLoading(false);
        })
    }
    return (
        <>
            {
                isLoading ?
                    <Loader /> :
                    <>
                        <div className='song-bg'>
                            <GlobalPlayer />
                        </div>
                    </>
            }
        </>
    )
}

export default Song