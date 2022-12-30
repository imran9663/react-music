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
                    <Icons.home />
                    {/* <p className="linkName">home</p> */}
                    <div className="activity-bar mt-2 px-2"></div>
                </NavLink>
                <NavLink
                    to={RouteStrings.search}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.search />
                    <div className="activity-bar mt-2 px-2"></div>

                    {/* <p className="linkName">discover</p><div className="activity-bar mt-2 px-2"></div> */}
                </NavLink>
                <NavLink
                    to={RouteStrings.playlist + "848372055"}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.BsHeart />
                    <div className="activity-bar mt-2 px-2"></div>

                    {/* <p className="linkName">Favorite</p><div className="activity-bar mt-2 px-2"></div> */}
                </NavLink>
                <NavLink
                    to={RouteStrings.account}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.AiOutlineUser />
                    <div className="activity-bar mt-2 px-2 "></div>
                    {/* <p className="linkName">you</p><div className="activity-bar mt-2 px-2"></div> */}
                </NavLink>
            </div>
        </>
    )
}

export default BottomBar