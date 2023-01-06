import React, { useEffect, useState } from 'react'
import './style.scss'
import { Icons } from '../../assets/Icons'
import CoustomRadio from '../../components/CoustomRadio'
import { useNavigate } from 'react-router'
import RouteStrings from '../../utils/RouteStrings'

const Account = () => {
    const qualityArr = [
        {
            name: 'low',
            value: 'LOW ',
            defualtSlected: false,
        },
        {
            name: 'medium',
            value: 'MEDIUM ',
            defualtSlected: false,
        },
        {
            name: 'high',
            value: 'HIGH ',
            defualtSlected: true,
        },
    ]
    const Navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.clear()
        // Navigate('/')
        window.location.assign(RouteStrings.home)
    }
    return (
        <>
            <div className="Account-cont">
                <div className="hero-wrapper">
                    <div className="hero">
                        <div className="top-bar">
                            <button onClick={() => { Navigate(-1) }} className="btn">
                                <Icons.BiArrowBack />
                            </button>
                            <button className="btn">
                                <Icons.BsThreeDotsVertical />
                            </button>
                        </div>
                        <div className="profile">
                            <div className="profile-pic">
                                <img src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_960_720.png" alt="profie" className="img-fluid profile-pic-img" />
                            </div>
                            <h4 className="user mt-2">imran pasha</h4>
                            <p className="username">@imranpasha</p>
                        </div>
                    </div>
                </div>
                <div className="account-body ">
                    <div className="data-saver px-2 mt-2">
                        <div className="data-saver--heading">Audio Quality</div>
                        <div className="data-saver--list">
                            {qualityArr.map((item, ind) => {
                                return (
                                    <>
                                        <CoustomRadio key={ind} data={item} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div onClick={() => {
                        Navigate(RouteStrings.updateLanguage)
                    }} className="languages p-2 mt-4">
                        <h5 className="languages--heading">Languages</h5>
                        <Icons.AiFillRightCircle />
                    </div>
                    {/* <div className="developer">

                    </div>
                    <div className="disclaimer">

                    </div> */}
                    <div className="logout">
                        <button onClick={handleLogOut} className="btn btn-danger">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Account