import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import GlobalPlayer from '../../components/GlobalPlayer'
import './style.scss'
import BottomBar from '../../components/BottomBar'
import { useSelector } from 'react-redux'
import { currentPlaylist } from '../../Redux/Reducers/PlayList-slice'
import RouteStrings from '../../utils/RouteStrings'

const Main = () => {
    const [showGlobalPlayer, setshowGlobalPlayer] = useState(false)
    const navigate = useNavigate()

    const tracks = useSelector(currentPlaylist);
    useEffect(() => {
        navigate(RouteStrings.home)
    }, [])

    useEffect(() => {
        console.log("tracks ", tracks?.length);
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