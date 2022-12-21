import React from 'react'
import { Outlet } from 'react-router'
import GlobalPlayer from '../../components/GlobalPlayer'
import './style.scss'
import BottomBar from '../../components/BottomBar'

const Main = () => {
    return (
        <>
            <div className=" cover">
                <Outlet />
                <div className="bottom_components">
                    {/* <GlobalPlayer /> */}
                    <BottomBar />
                </div>

            </div>


        </>
    )
}

export default Main