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
            navigate(RouteStrings.artist + item.artistid)
        } else if (item.id) {
            navigate(RouteStrings.artist + item.id)
        }
    }

    return (
        <>
            <div style={Style} onClick={handleClick} className="d-flex flex-column round-wrapper ">
                <img loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = Icons.defualtImage;
                    }} style={{ width: imgWidth }} src={getCorrectSrc(item.image)} alt="artist" className="img-fluid rounded-circle" />
                <p className="text-center text-light text-truncate">
                    {item?.name ? item?.name : item?.title}
                </p>
            </div>
        </>
    )
}

export default RoundCard