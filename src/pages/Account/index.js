import React, { useEffect, useState } from 'react'
import './style.scss'
import { Icons } from '../../assets/Icons'
import CoustomRadio from '../../components/CoustomRadio'

const Account = () => {
    const qualityArr = [
        {
            name: 'low',
            value: 'LOW ',
        },
        {
            name: 'medium',
            value: 'MEDIUM ',
        },
        {
            name: 'high',
            value: 'HIGH ',
        },
    ]
    return (
        <>
            <div className="Account-cont">
                <div className="hero-wrapper">
                    <div className="hero">
                        <div className="top-bar">
                            <button className="btn">
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
                    <div className="data-saver mt-2">
                        <div className="data-saver--heading">Audio Quality</div>
                        <div className="data-saver--list">
                            {qualityArr.map(item => {
                                return (
                                    <>
                                        <CoustomRadio data={item} />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className="languages mt-4">
                        <h5 className="languages--heading">Languages</h5>
                        <Icons.AiFillRightCircle />
                    </div>
                    <div className="developer">

                    </div>
                    <div className="disclaimer">

                    </div>
                    <div className="logout">
                        <button className="btn btn-danger">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Account