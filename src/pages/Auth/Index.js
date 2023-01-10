import React from 'react'
import { Outlet } from 'react-router'
import './style.scss'
const Auth = () => {
    return (
        <>
            <div className="Auth-screen">
                <Outlet />
            </div>
        </>
    )
}

export default Auth