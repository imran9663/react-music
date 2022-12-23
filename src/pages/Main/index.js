import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import GlobalPlayer from '../../components/GlobalPlayer'
import './style.scss'
import BottomBar from '../../components/BottomBar'
import { useSelector } from 'react-redux'
import { currentPlaylist } from '../../Redux/Reducers/PlayList-slice'

const Main = () => {
    const [showGlobalPlayer, setshowGlobalPlayer] = useState(false)
    const tracks = useSelector(currentPlaylist)
    useEffect(() => {
        console.log("tracks ", tracks);
        tracks?.length > 0 ? setshowGlobalPlayer(true) : setshowGlobalPlayer(false)
    }, [tracks?.length])
    return (
        <>
            <div className=" cover">
                <Outlet />
                <div className="bottom_components">
                    {showGlobalPlayer && <GlobalPlayer />}
                    <BottomBar />
                </div>

            </div>


        </>
    )
}

export default Main