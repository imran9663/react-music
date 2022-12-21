import React, { useEffect, useState } from 'react'
import MusicSlider from '../../components/MusicSlider'
import { getRequest } from '../../apis/Base/serviceMethods'
import { configURL } from '../../apis/Base/config'

const Home = () => {
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


    const getHomePageData = async () => {
        await getRequest(configURL.homePage).then(res => {
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
        })
    }
    return (
        <>
            <div className="mt-5">
                <section className='mb-5'>
                    <h4 className='text-light text-capitalize'>Trending</h4>
                    <h5 className='text-light text-capitalize'>albums</h5>
                    <MusicSlider data={HomePageData?.trenadingAlbums} />
                    <h5 className='text-light text-capitalize'>Songs</h5>
                    <MusicSlider data={HomePageData?.trenadingSongs} />
                </section>
                <section className='mb-5'>
                    <h5 className='text-light text-capitalize'>Albums</h5>
                    <MusicSlider data={HomePageData?.albums} />
                </section>
                <section className='mb-5'>
                    <h4 className='text-light text-capitalize'>Charts</h4>
                    <MusicSlider isSquare={true} data={HomePageData?.charts} />
                </section>
                <section className='mb-5'>
                    <h4 className='text-light text-capitalize'>Playlists</h4>
                    <MusicSlider data={HomePageData?.playlists} />
                </section>
            </div>
        </>
    )
}








export default Home