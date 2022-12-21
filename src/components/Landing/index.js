import React, { useEffect } from 'react'
import LandingLoader from '../../assets/gif/landing_loader.gif'
import './style.scss'
import { useNavigate } from 'react-router'
const Landing = () => {

    const navigate = useNavigate()
    useEffect(() => {
        navigateToHome()
    }, [])
    const navigateToHome = () => {
        setTimeout(() => {
            navigate("/home");
        }, 2000);
    }
    return (
        <div className='dark-bg landing-cover'>
            <img src={LandingLoader} alt="LandingLoader" className="img-fluid LandingLoader" />
            <div className="d-flex flex-row ">
                <p className="initial">r</p>
                <p className="initial">e</p>
                <p className="initial">a</p>
                <p className="initial">c</p>
                <p className="initial">t</p>
                &nbsp;
                &nbsp;
                <p className="initial">m</p>
                <p className="initial">u</p>
                <p className="initial">s</p>
                <p className="initial">i</p>
                <p className="initial">c</p>
            </div>
            <div className="d-flex flex-row ">

            </div>
        </div>
    )
}

export default Landing