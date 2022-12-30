import React, { useEffect, useState } from 'react'
import MusicSlider from '../../components/MusicSlider'
import { getRequest } from '../../apis/Base/serviceMethods'
import { configURL } from '../../apis/Base/config'
import SlideLoader from '../../components/Loader/SlideLoader'
import { useNavigate } from 'react-router'
import RouteStrings from '../../utils/RouteStrings'
import { Icons } from '../../assets/Icons'
import { setLocalPlayListData } from '../../Redux/Reducers/PlayList-slice'
import { useDispatch } from 'react-redux'
import './style.scss'
import { getNamefromArray } from '../../utils'
import RoundCard from '../../components/RoundCard'
import topArtist from '../../utils/data/index.json'
const Home = () => {
    const [isLoading, setisLoading] = useState(false)
    const [HomePageData, setHomePageData] = useState({
        albums: [],
        charts: [],
        playlists: [],
        trenadingAlbums: [],
        trenadingSongs: [],
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        getHomePageData()
    }, [])
    const handleClick = (id) => {
        navigate(RouteStrings.song + id)
    }
    const handlePlaySong = (songData) => {
        dispatch(setLocalPlayListData(songData))
    }
    const languages = ['kannada', 'hindi']
    const getHomePageData = async () => {
        setisLoading(true)
        await getRequest(configURL.homePage + languages).then(res => {
            setHomePageData({
                ...HomePageData,
                albums: res?.data?.data.albums,
                charts: res?.data?.data.charts,
                playlists: res?.data?.data.playlists,
                trenadingAlbums: res?.data?.data.trending.albums,
                trenadingSongs: res?.data?.data.trending.songs,
            })
        }).catch(err => {
            console.log("getHomePageData err", err);
        }).finally(() => {
            setisLoading(false)
        })
    }
    const artistLength = 7
    return (
        <>
            <div className="mt-5">
                <section className='mb-3 '>
                    <h2 className='text-light mx-3 text-capitalize'>Trending</h2>
                    <h5 className='text-light mx-3 text-capitalize'>albums</h5>
                    {isLoading ? <SlideLoader /> :
                        <>
                            <div className="m-3">
                                <MusicSlider data={HomePageData?.trenadingAlbums} />
                            </div>
                        </>
                    }
                    <h5 className='text-light  mx-3 text-capitalize'>Songs</h5>
                    {isLoading ? <SlideLoader /> :
                        <>
                            <div className="songlist mx-3">
                                {HomePageData?.trenadingSongs.map(item => {
                                    return (
                                        <>
                                            <div key={item?.id} className="songlist-card">
                                                <img onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = Icons.defualtImage;
                                                }} onClick={() => handleClick(item?.id)} className="img-fluid songlist-card-img " src={item?.image[1].link} alt="album-art" />
                                                <div onClick={() => handleClick(item?.id)} className="songlist-card-info">
                                                    <p className="songlist-card-info-songName"> {item?.name}</p>
                                                    <p className="songlist-card-info-artistName">{getNamefromArray(item?.primaryArtists)}</p>
                                                </div>
                                                <div className="songlist-card-controls">
                                                    <button onClick={() => handlePlaySong(item)} className='btn songlist-card-controls-btn '>
                                                        <Icons.BsPlayFill />
                                                    </button>
                                                    <button className='btn songlist-card-controls-btn'>
                                                        <Icons.BsThreeDotsVertical />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </>}
                </section>
                <section className='mb-5 mx-3'>
                    <h5 className='text-light text-capitalize'>Albums</h5>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider data={HomePageData?.albums} />}
                </section>
                <section className='mb-2'>
                    <h4 className='text-light mx-3 text-capitalize '>top artists</h4>
                    <div className="artist-wrapper">
                        {topArtist.map(((item, ind) => {
                            if (ind <= artistLength) {
                                return (
                                    <>
                                        <RoundCard item={item} />
                                    </>
                                )
                            }
                        }))}
                        <button onClick={() => { console.log("open all artist page"); }} className='btn btn-lg  text-center text-light text round-circle'>
                            See All
                            <Icons.BsArrowRight />
                        </button>
                    </div>
                </section>
                <section className='mb-3 mx-3'>
                    <h4 className='text-light mb-3 text-capitalize'>Charts</h4>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider isSquare={true} data={HomePageData?.charts} />}
                </section>
                <section className='mb-3 mx-3'>
                    <h4 className='text-light mb-3  text-capitalize'>Playlists</h4>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider data={HomePageData?.playlists} />}
                </section>
            </div>
            <div className="h-10"></div>
        </>
    )
}








export default Home