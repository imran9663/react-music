import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { getRequest } from '../../apis/Base/serviceMethods'
import { configURL } from '../../apis/Base/config'
import './style.scss'
import { Icons } from '../../assets/Icons'
import RouteStrings from '../../utils/RouteStrings'
const PlayList = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [playlistData, setplaylistData] = useState({})
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        getPlaylistdata()
    }, []);
    const getPlaylistdata = async () => {
        setisLoading(true)
        await getRequest(configURL.playlist + id).then((res) => {
            setplaylistData(res?.data?.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setisLoading(false)

        })
    }
    const handleClick = (url) => {
        navigate(
            RouteStrings.song,
            {
                state: {
                    url: url
                }
            }
        )
    }
    return (
        <>
            {isLoading ?
                <h2 className='text-light'>
                    Loading...
                </h2>
                :
                <div className=" d-flex flex-column playlist-container">
                    {Object.keys(playlistData).length > 0 &&
                        <>
                            <div className="hero">
                                <img
                                    className=' hero-image'
                                    src={playlistData.image[2].link}
                                    alt="hero "
                                />
                                <div className="hero-overlay">
                                </div>
                            </div>
                            <div className="playlist-info">
                                <div className="col-4 image-cover">
                                    <img src={playlistData.image[0].link} alt="" className="prfilethumb" />
                                </div>
                                <div className=" col-8 playlist-info-headings">
                                    <h4 className='text-capitalize text-white mt-2'>
                                        {playlistData.name}
                                    </h4>
                                    <p className='userName'> @{playlistData.userId}</p>
                                    <div className="playlist-rating">
                                        <div className="rate-cont">
                                            <img src={Icons.music} alt="songCount" className="img-fluid" />
                                            <p className="text-white">{playlistData.songCount}</p>
                                        </div>
                                        <div className="rate-cont">
                                            <img src={Icons.user} alt="fanCount" className="img-fluid" />
                                            <p className="text-white">{playlistData.fanCount}</p>
                                        </div>
                                        <div className="rate-cont">
                                            <img src={Icons.heart} alt="followerCount" className="img-fluid" />
                                            <p className="text-white">{playlistData.followerCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="songlist">
                                {playlistData.songs.map(item => {
                                    return (
                                        <>
                                            <div id={item.id} onClick={() => handleClick(item.url)} className="songlist-card">
                                                <img className="img-fluid songlist-card-img " src={item?.image[1].link} alt="album-art" />
                                                <div className="songlist-card-info">
                                                    <p className="songlist-card-info-songName"> {item.name}</p>
                                                    <p className="songlist-card-info-artistName">{item?.primaryArtists}</p>
                                                </div>
                                                <div className="songlist-card-controls">
                                                    <button className='btn songlist-card-controls-btn '><img src={Icons.play} alt="PlayCircle" className="img-fluid" /></button>
                                                    <button className='btn songlist-card-controls-btn'><img src={Icons.morevertical} alt="more menu" className="img-fluid" /></button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}


                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default PlayList