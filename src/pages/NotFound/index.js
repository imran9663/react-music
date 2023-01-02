import React from 'react'
import './style.scss'
import { Icons } from '../../assets/Icons'
import RouteStrings from '../../utils/RouteStrings'
import { useNavigate } from 'react-router'
const NotFound = () => {
    const Navigate = useNavigate()
    return (
        <>
            <div className="notfound">
                <img src={Icons.notFound} alt="notfound img" className="img-fluid" />
                <h4 className='text-center text-light'>
                    Page Not Found
                </h4>
                <button onClick={() => { Navigate(RouteStrings.home) }} className="btn btn-accent">
                    <Icons.home /> Go Home
                </button>
            </div>
        </>
    )
}

export default NotFound