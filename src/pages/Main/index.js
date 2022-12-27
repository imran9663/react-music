import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import GlobalPlayer from '../../components/GlobalPlayer'
import './style.scss'
import BottomBar from '../../components/BottomBar'
import { useSelector } from 'react-redux'
import { currentPlaylist } from '../../Redux/Reducers/PlayList-slice'
import RouteStrings from '../../utils/RouteStrings'
import Landing from '../../components/Landing'

const Main = () => {
    const [showGlobalPlayer, setshowGlobalPlayer] = useState(false)
    const navigate = useNavigate()

    const tracks = useSelector(currentPlaylist);
    const [showLanding, setshowLanding] = useState(true)
    useEffect(() => {
        routeTomain()
    }, [])
    const routeTomain = () => {
        setTimeout(() => {
            setshowLanding(false)
            navigate(RouteStrings.home)
        }, 1000);
    }


    useEffect(() => {
        tracks?.length > 0 ? setshowGlobalPlayer(true) : setshowGlobalPlayer(false)
    }, [tracks?.length])
    return (
        <> {showLanding ? <Landing /> :

            <div className=" cover">
                <Outlet />
                <div className="bottom_components">
                    {showGlobalPlayer && <GlobalPlayer />}
                    <BottomBar />
                </div>
            </div>
        }
        </>
    )
}

export default Main