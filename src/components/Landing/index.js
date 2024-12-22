import React from 'react'
import { Icons } from '../../assets/Icons'
import './style.scss'
import HeroLady from '../../assets/Imges/pexels-sound-on-3756962-removebg.png'
const Landing = () => {
    return (
        <div className='dark-bg landing-cover'>
            <div className="icon-cover">
                <Icons.SiReact />
            </div>
            <div className="d-flex mt-3 flex-row mx-2 ">
                <p className="initial">r</p>
                <p className="initial">e</p>
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