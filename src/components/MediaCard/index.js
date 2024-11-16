import React from 'react'
import { useNavigate } from 'react-router'
import RouteStrings from '../../utils/RouteStrings'
import './style.scss'
import { getCorrectSrc } from '../../utils'
import { Icons } from '../../assets/Icons'
import SongStrip from '../SongStrip'

const MediaCard = ({ Data, Style, ImgStyle }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        switch ((Data.type).toLowerCase()) {
            case 'album':
                navigate(RouteStrings.albums + Data.id)
                break;
            case 'playlist':
                navigate(RouteStrings.playlist + Data.id)
                break;
            case 'song':
                navigate(RouteStrings.song + Data.id)
                break;
            case 'artist':
                navigate(RouteStrings.artist + Data.id)
                break;
            default:
                console.log("cannot find type ");
                break;
        }
    }
    return (
        <>{
            (Data.type === 'playlist' || Data.type === 'album') &&
            <div style={Style} onClick={handleClick} className={`albumCard ${Data.type === 'playlist' && 'playlist'}`}>
                <img loading="lazy" style={ImgStyle} onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = Icons.defualtImage;
                }} className="albumCard-img-top" src={getCorrectSrc(Data.image)} alt='albumart' />
                <div className="albumCard-body">
                    <p className={`albumCard-body-text text-truncate ${Data.type === 'playlist' && 'playlist-body-text'}`}>{Data.name ? Data.name : Data.title}</p>
                </div>
            </div>
        }
            {(Data.type === 'song') &&
                <>
                {/* <div onClick={handleClick} className="songCard mx-2">
                        <img loading="lazy" onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = Icons.defualtImage;
                        }} src={getCorrectSrc(Data.image)} alt="albumart" className="songCard-img img-fluid" />
                        <div className="songCard-info">
                            <h4 className='songCard-info-title text-truncate'>{Data.name ? Data.name : Data.title}</h4>
                            <p className='songCard-info-artist text-truncate'>{Data.primaryArtists ? Data.primaryArtists : Data.singers}</p>
                        </div>
                    </div> */}

                <SongStrip data={Data} />
                </>
            }
            {
                (Data.type === 'artist') &&
                <>
                    <div onClick={handleClick} className={`albumCard`}>
                        <img loading="lazy" onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = Icons.defualtImage;
                        }} className="albumCard-img-top rounded-border"

                            src={getCorrectSrc(Data.image)} alt='albumart' />
                        <div className="albumCard-body">
                            <p className={`albumCard-body-text text-truncate`}>{Data.name ? Data.name : Data.title}</p>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default MediaCard