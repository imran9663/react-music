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
                    className={({ isActive }) => isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.home />
                </NavLink>
                <NavLink
                    to={RouteStrings.myMusic}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.BsRadioPin />
                </NavLink>
                <NavLink
                    to={RouteStrings.account}
                    className={({ isActive }) =>
                        isActive ? "anchor-links-active" : "anchor-links"}>
                    <Icons.AiOutlineUser />
                </NavLink>


            </div>
        </>
    )
}

export default BottomBar