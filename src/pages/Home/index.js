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
import { ParseString, getNamefromArray } from '../../utils'
import RoundCard from '../../components/RoundCard'
import topArtist from '../../utils/data/index.json'
import SongStrip from '../../components/SongStrip'
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
    const languages = ['hindi', 'kannada']
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
            <div className="homewrapper">
                <section>
                    <div className="banner">
                        <div className="hello">Hello <span>Imran</span></div>
                    </div>
                    <div className="trendingWrapper">
                        <h2 className='text-light  text-capitalize trending'>Trending</h2>
                        <div id="curved-corner-topleft"></div>
                    </div>
                    <h5 className='text-light mt-3 mx-3 text-capitalize'>albums</h5>
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
                            <div className="homepage-songlist mx-3">
                                {HomePageData?.trenadingSongs.map(item => {
                                    return (
                                        <SongStrip data={item} />
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
            <div className="p-5 m-5">
                <div className="null opacity-0"></div>
            </div>
        </>
    )
}








export default Home