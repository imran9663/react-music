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
    const checkToken = () => {
        const token = JSON.parse(localStorage.getItem(loaclStorageStrings.token));
        return (token != null) ? true : false
    }
    const getLang = () => {
        const { language } = JSON.parse(localStorage.getItem(loaclStorageStrings.profileInfo))
        console.log("LANG", language);
        return language?.length > 0 ? true : false
    }
    const routeTomain = () => {
        setTimeout(() => {
            setshowLanding(false)
            checkToken() ? (getLang() ? navigate(RouteStrings.home) : navigate(RouteStrings.updateLanguage)) : (navigate(RouteStrings.login));
        }, 1000);
    }
    useEffect(() => {
        tracks?.length > 0 ? setshowGlobalPlayer(true) : setshowGlobalPlayer(false)
    }, [tracks?.length])
    return (
        <> {showLanding ? <Landing /> :
            <div className=" cover">
                <Outlet />
                {showGlobalPlayer &&
                    <div className='gbl_player--placeholder'>
                    </div>}
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