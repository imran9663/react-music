import React, { useEffect, useState } from 'react'
import MusicSlider from '../../components/MusicSlider'
import { getRequest } from '../../apis/Base/serviceMethods'
import { configURL } from '../../apis/Base/config'
import SlideLoader from '../../components/Loader/SlideLoader'

const Home = () => {
    const [isLoading, setisLoading] = useState(false)
    const [HomePageData, setHomePageData] = useState({
        albums: [],
        charts: [],
        playlists: [],
        trenadingAlbums: [],
        trenadingSongs: [],
    })

    useEffect(() => {
        getHomePageData()
    }, [])

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
    return (
        <>
            <div className="mt-5">
                <section className='mb-5'>
                    <h4 className='text-light text-capitalize'>Trending</h4>
                    <h5 className='text-light text-capitalize'>albums</h5>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider data={HomePageData?.trenadingAlbums} />
                    }
                    <h5 className='text-light text-capitalize'>Songs</h5>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider data={HomePageData?.trenadingSongs} />}
                </section>
                <section className='mb-5'>
                    <h5 className='text-light text-capitalize'>Albums</h5>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider data={HomePageData?.albums} />}
                </section>
                <section className='mb-5'>
                    <h4 className='text-light text-capitalize'>Charts</h4>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider isSquare={true} data={HomePageData?.charts} />}
                </section>
                <section className='mb-5'>
                    <h4 className='text-light text-capitalize'>Playlists</h4>
                    {isLoading ? <SlideLoader /> :
                        <MusicSlider data={HomePageData?.playlists} />}
                </section>
            </div>
        </>
    )
}








export default Home