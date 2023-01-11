import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import GlobalPlayer from '../../components/GlobalPlayer'
import './style.scss'
import BottomBar from '../../components/BottomBar'
import { useSelector } from 'react-redux'
import { currentPlaylist } from '../../Redux/Reducers/PlayList-slice'
import RouteStrings from '../../utils/RouteStrings'
import Landing from '../../components/Landing'
import { loaclStorageStrings } from '../../utils/localStorageStrings'

const Main = () => {
    const [showGlobalPlayer, setshowGlobalPlayer] = useState(false)
    const navigate = useNavigate()

    const tracks = useSelector(currentPlaylist);
    const [showLanding, setshowLanding] = useState(true)
    useEffect(() => {
        routeTomain()
    }, [])
    const islanguagesSelected = () => {
        const token = JSON.parse(localStorage.getItem(loaclStorageStrings.token))
        return (token != null) ? true : false
    }
    const routeTomain = () => {
        setTimeout(() => {
            setshowLanding(false)
            // islanguagesSelected() ? navigate(RouteStrings.home) : navigate(RouteStrings.register)
            islanguagesSelected() ? navigate(RouteStrings.home) : navigate(RouteStrings.otp)
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