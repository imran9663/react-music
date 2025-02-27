import { get } from 'loadsh'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { configURL } from '../../apis/Base/config'
import { getRequest } from '../../apis/Base/serviceMethods'
import { Icons } from '../../assets/Icons'
import BannerLoader from '../../components/Loader/BannerLoader'
import SongStripeLoader from '../../components/Loader/SongStripeLoader'
import SongStrip from '../../components/SongStrip'
import Topbar from '../../components/Topbar'
import { currentPlaylist, setLocalPlayListData } from '../../Redux/Reducers/PlayList-slice'
import { ParseString } from '../../utils'
import RouteStrings from '../../utils/RouteStrings'
import './style.scss'

const Album = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [playlistData, setplaylistData] = useState({})
    const [isLoading, setisLoading] = useState(false)
    const tracks = useSelector(currentPlaylist)

    useEffect(() => {
        getAlbumdata()
    }, []);
    const getAlbumdata = async () => {
        setisLoading(true)
        await getRequest(configURL.albums + id).then((res) => {
            setplaylistData(res?.data?.data)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setisLoading(false)
        })
    }
    const handleClick = (id) => {
        navigate(RouteStrings.song + id)
    }
    const handlePlaySong = (songData) => {
        dispatch(setLocalPlayListData(songData))
    }
    const handlePlayAlbum = () => {
        dispatch(setLocalPlayListData(playlistData.songs))
    }
    return (
        <>
            {isLoading ?
                <>
                    <BannerLoader />
                    <br />
                    <br />
                    <br />
                    <SongStripeLoader />
                    <SongStripeLoader />
                    <SongStripeLoader />
                    <SongStripeLoader />

                </>

                :
                <div className=" d-flex flex-column playlist-container">
                    {Object.keys(playlistData).length > 0 &&
                        <>
                            <div className="hero">

                                <img loading="lazy" onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = Icons.defualtImage;
                                }}
                                    className=' hero-image'
                                    src={playlistData.image[2].link}
                                    alt="hero "
                                />
                                <div className="hero-overlay">
                                </div>
                            </div>
                            <div className="song_warpper-top-bar tbar">
                                <button onClick={() => { navigate(-1) }} className="btn back-btn">
                                    <Icons.BsArrowLeft />
                                </button>
                                <button className="btn">
                                    <Icons.BsThreeDotsVertical />
                                </button>
                            </div>
                            <Topbar tbClassName={'tbar'} />
                            <div className="playlist-info">

                                <div className="col-4 image-cover">
                                    <img loading="lazy" onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = Icons.defualtImage;
                                    }} src={playlistData.image[0].link} alt="" className="prfilethumb" />
                                </div>
                                <div className=" col-8 playlist-info-headings">
                                    <h4 className='text-capitalize text-white mt-2'>
                                        {ParseString(playlistData.name)}
                                    </h4>
                                    <p className='userName'> {playlistData.userId ? '@' + playlistData.userId : '--'}</p>
                                    <div className="playlist-rating">
                                        <div className="rate-cont icon-svg">
                                            <Icons.BsMusicNote />
                                            <p className="text-white">{playlistData.songCount}</p>
                                        </div>
                                        <div className="rate-cont icon-svg">
                                            <Icons.AiOutlineUser />
                                            <p className="text-white">{playlistData.fanCount ? playlistData.fanCount : "--"}</p>
                                        </div>
                                        <div className="rate-cont icon-svg">
                                            <Icons.BsHeart />
                                        <p className="text-white ">{playlistData.followerCount ? playlistData.followerCount : "--"}</p>
                                    </div>

                                </div>
                                <div className="rate-cont mt-1">
                                    <p className=" release-date text-secondary">Released On : <span>{get(playlistData, 'releaseDate', '--')}</span> </p>
                                </div>
                                </div>
                            </div>
                            <div className="w-100 play-button-wrapper">
                                <button onClick={handlePlayAlbum} className='btn round_btn'>
                                    <Icons.BsPlayFill />
                                </button>
                            </div>
                            <div className="songlist">
                            {playlistData.songs.map((item, ind) => {
                                    return (
                                        <>
                                            <SongStrip key={ind} data={item} />
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

export default Album