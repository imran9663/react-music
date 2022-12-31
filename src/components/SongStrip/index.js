import React from 'react'
import { Icons } from '../../assets/Icons';
import { ParseString, getNamefromArray } from '../../utils';
import RouteStrings from '../../utils/RouteStrings';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLocalPlayListData } from '../../Redux/Reducers/PlayList-slice';
import './style.scss'
const SongStrip = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = (id) => {
        navigate(RouteStrings.song + id)
    }
    const handlePlaySong = (songData) => {
        dispatch(setLocalPlayListData(songData))
    }
    return (
        <>
            <div key={data?.id} className="homepage-songlist-card">
                <img onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = Icons.defualtImage;
                }} onClick={() => handleClick(data?.id)} className="img-fluid homepage-songlist-card-img " src={data?.image[1].link} alt="album-art" />
                <div onClick={() => handleClick(data?.id)} className="homepage-songlist-card-info">
                    <p className="homepage-songlist-card-info-songName"> {ParseString(data?.name)}</p>
                    <p className="homepage-songlist-card-info-artistName">{getNamefromArray(data?.primaryArtists)}</p>
                </div>
                <div className="homepage-songlist-card-controls">
                    {data?.downloadUrl?.length > 0 && <button onClick={() => handlePlaySong(data)} className='btn homepage-songlist-card-controls-btn '>
                        <Icons.BsPlayFill />
                    </button>}
                    <button className='btn homepage-songlist-card-controls-btn'>
                        <Icons.BsThreeDotsVertical />
                    </button>
                </div>
            </div>
        </>
    )
}

export default SongStrip