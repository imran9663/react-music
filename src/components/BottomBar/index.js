import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.scss'
import { Icons } from '../../assets/Icons'
import RouteStrings from '../../utils/RouteStrings'
const BottomBar = () => {
    return (
        <>
            <div className="bottom-bar">
                <NavLink
                    to={RouteStrings.home}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}
                >
                    <img src={Icons.home} alt="for you" className="img-fluid" />
                    <p className="linkName">home</p>
                    <div className="activity-bar"></div>
                </NavLink>
                <NavLink
                    to={RouteStrings.search}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <img src={Icons.search} alt="for you" className="img-fluid" />
                    <p className="linkName">discover</p><div className="activity-bar"></div>
                </NavLink>
                <NavLink
                    to={RouteStrings.playlist}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <img src={Icons.heart} alt="for you" className="img-fluid" />
                    <p className="linkName">Favorite</p><div className="activity-bar"></div>
                </NavLink>
                <NavLink
                    to={RouteStrings.account}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <img src={Icons.user} alt="for you" className="img-fluid" />
                    <p className="linkName">you</p><div className="activity-bar"></div>
                </NavLink>
            </div>
        </>
    )
}

export default BottomBar