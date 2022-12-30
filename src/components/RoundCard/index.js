import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router'
import RouteStrings from '../../utils/RouteStrings'
import { getCorrectSrc } from '../../utils'
import { Icons } from '../../assets/Icons'
const RoundCard = ({ item, Style, imgWidth }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        if (item.artistid) {
            navigate(RouteStrings.song + item.artistid)
        } else if (navigate(RouteStrings.song + item.id)) {
            navigate(RouteStrings.song + item.id)
        }
    }

    return (
        <>
            <div style={Style} onClick={handleClick} className="d-flex flex-column round-wrapper ">
                <img onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = Icons.defualtImage;
                }} style={{ width: imgWidth }} src={getCorrectSrc(item.image)} alt="artist" className="img-fluid rounded-circle" />
                <p className="text-center text-light">
                    {item?.name ? item?.name : item?.title}
                </p>
            </div>
        </>
    )
}

export default RoundCard