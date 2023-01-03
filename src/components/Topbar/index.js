import React from 'react'
import { Icons } from '../../assets/Icons'
import { useNavigate } from 'react-router'
import './style.scss'
const Topbar = ({ Transparent, tbClassName }) => {
    const navigate = useNavigate()
    const isTransperant = () => {
        return Transparent != null ? { background: Transparent } : { background: 'transparent' }
    }
    return (
        <div className={`top-bar  ${tbClassName}`} style={isTransperant()}>
            <button onClick={() => { navigate(-1) }} className="btn back-btn">
                <Icons.BsArrowLeft />
            </button>
            <button className="btn">
                <Icons.BsThreeDotsVertical />
            </button>
        </div>
    )
}

export default Topbar