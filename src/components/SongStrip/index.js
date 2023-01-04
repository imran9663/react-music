import React from 'react'
import { Icons } from '../../assets/Icons';
import { ParseString, getNamefromArray } from '../../utils';
import RouteStrings from '../../utils/RouteStrings';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addAndPlayNextTrack, addToQueue, setLocalPlayListData } from '../../Redux/Reducers/PlayList-slice';
import './style.scss'
import Dropdown from 'react-bootstrap/Dropdown';
const SongStrip = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = (id) => {
        navigate(RouteStrings.song + id)
    };
    const handleClickDropDownItem = (songData, newAction) => {
        console.log("dd item clicked");
        switch (newAction) {
            case 'playNext':
                dispatch(addAndPlayNextTrack(songData))
                break;
            case 'addtoQueue':
                dispatch(addToQueue(songData))
                break;
            default:
                break;
        }
    };
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
                {data?.downloadUrl?.length > 0 &&
                    <div className="homepage-songlist-card-controls">
                        <button onClick={() => handlePlaySong(data)} className='btn homepage-songlist-card-controls-btn '>
                            <Icons.BsPlayFill />
                        </button>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic" className='homepage-songlist-card-controls-btn'>
                                <Icons.BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark" className='dd-menu'>
                                <Dropdown.Item onClick={() => handleClickDropDownItem(data, 'playNext')}>
                                    <span><Icons.IoPlaySkipForward /></span> Play next
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleClickDropDownItem(data, 'addtoQueue')}>
                                    <span><Icons.BiAddToQueue /></span> Add to queue
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>

                    </div>}
            </div>
        </>
    )
}

export default SongStrip