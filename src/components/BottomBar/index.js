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
                    to={RouteStrings.search}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.search />


                    {/* <p className="linkName">discover</p> */}
                </NavLink>
                <NavLink
                    to={RouteStrings.home}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}
                >
                    <Icons.home />
                    {/* <p className="linkName">home</p> */}

                </NavLink>
                <NavLink
                    to={RouteStrings.account}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.AiOutlineUser />
                    {/* <p className="linkName">you</p> */}
                </NavLink>
            </div>
        </>
    )
}

export default BottomBar