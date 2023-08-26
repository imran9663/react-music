import React from 'react'
import './style.scss'
import { Icons } from '../../assets/Icons'
import { Outlet, useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import RouteStrings from '../../utils/RouteStrings'
const MyMusic = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="mymusic mt-2">
                <div className="song_warpper-top-bar tbar">
                    <button onClick={() => { navigate(-1) }} className="btn back-btn">
                        <Icons.BsArrowLeft />
                    </button>
                    <button className="btn">
                        <Icons.BsThreeDotsVertical />
                    </button>
                </div>
                <div className="tabs">
                    <div className="navbar">
                        <NavLink index={0} to={RouteStrings.recentlyPlayed}
                            className={({ isActive }) =>
                                isActive ? "navbar-link active" : 'navbar-link'
                            }
                        > RecentlyPlayed</NavLink>
                        <NavLink to={RouteStrings.myfavorites} className="navbar-link"> Favorites</NavLink>
                    </div>
                    <hr />
                    <div className="tabs-body">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyMusic