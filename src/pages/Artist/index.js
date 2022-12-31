import React, { useEffect, useState } from 'react'
import './style.scss';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosInstence from '../../apis/Base';
import { configURL } from '../../apis/Base/config';
import { getRequest } from '../../apis/Base/serviceMethods';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { getCorrectSrc, nFormatter } from '../../utils';
import { Icons } from '../../assets/Icons';
import RouteStrings from '../../utils/RouteStrings';

const Artist = () => {
    const params = useParams();

    const [artist, setartist] = useState({
        details: {
            "id": "459320",
            "name": "Arijit Singh",
            "url": "https://www.jiosaavn.com/artist/arijit-singh-/LlRWpHzy3Hk_",
            "image": [
                {
                    "quality": "50x50",
                    "link": "https://c.saavncdn.com/artists/Arijit_Singh_50x50.jpg"
                },
                {
                    "quality": "150x150",
                    "link": "https://c.saavncdn.com/artists/Arijit_Singh_150x150.jpg"
                },
                {
                    "quality": "500x500",
                    "link": "https://c.saavncdn.com/artists/Arijit_Singh_500x500.jpg"
                }
            ],
            "followerCount": "7621533",
            "fanCount": "23164086",
            "isVerified": true,
            "dominantLanguage": "hindi",
            "dominantType": "singer",
            "bio": [
                {
                    "text": "Arijit Singh, is an Indian playback singer. He was one of top six contestants in reality-singing series, Fame Gurukul in 2005 and became an assistant to music director Pritam.Known for his soulful voice that reverberates with romantic songs, Arijit Singh is setting new trends in the music industry, by stirring up unforgetable notes for the young hearts. Arijit was born in Murshidabad, Jiaganj, West Bengal, India on 25th April, 1987. He got married to Koel(in Jan 2014)and the couple lives in Mumbai.",
                    "title": "Introduction",
                    "sequence": 1
                },
                {
                    "text": "Born to a Punjabi father and Bengali mother in Murshidabad in West Bengal, Arijit Singh, got trained in classical singing at an early age. He gives credit to his â€˜three gurusâ€™- Rajendra Prasad Hazari for teaching him Indian classical music, Dhirendra Prasad Hazari for tabla lessons, and Birendra Prasad Hazari for teaching him Rabindra sangeet and pop music. Also his grandmother sings, while his mother's sister (mausi) sings Indian Classical vocals. His maternal uncle plays the tabla.\r\n\r\nHis career as a playback singer came when he was in college and participated in a TV reality show called Fame Gurukul in 2005. Although he did not win the competition, he earned a large fan following and later went on to win â€˜10 Ke 10 Le Gaye Dilâ€™ song competition reality show with audience votes.\r\n\r\nWhen TIPS industries signed him up for a contract when he was 18, he said, â€œI am very happy with this contract. They have promised us five albums in the next five years. But it doesn't mean that we cannot work outside the company. We just have to inform TIPS. For example, if I get an offer and decide to sing, I will have to inform the company about it. See, I am doing shows organized by other companies.\"\r\n\r\nIt was Shankar Ehsaan Loy who gave Arijit his break with the song All For One for the High School Musical 2 (Vol.1) Album. In that period, Arijit had also sung the title song Hum Hai Deewane (during which he says he slept through the auditions) for the Indian TV Show called Madhubala â€“Ek Ishq Ek Junoon and Dadagiri with Avishek Das. The Show featured Sourav Ganguly. The other track he sang was for the Bengali TV serial Tomay Amay Mile, along with Ujjaini Mukherjee.\r\n\r\nHis moment of glory in Bollywood came with the song Tum Hi Ho for the romantic blockbuster Aashiqui 2 in 2013, which had topped charts worldwide and remained in the top 10 of Planet Bollywood for eight weeks, while also remaining on first spot on Top 20 of MTV India, for seven weeks. He also received the Filmfare Award for Best Male Playback Singer in the 59th Filmfare Awards for this song.",
                    "title": "Early Career",
                    "sequence": 2
                },
                {
                    "text": "Arijit Singh married his long time ladylove Koel Roy at Tarapith temple, West Bengal on January 20, 2014 in a private ceremony. The media got whiff of it only after he posted his wedding picture with his bride on his WhatsApp profile. His current wife, Koel has a four-year-old daughter from her earlier marriage, who is reportedly fond of Arijit. Reports say that Arijit Singhâ€™s first marriage was with one of his co-contestants from a reality show.",
                    "title": "His Marriage",
                    "sequence": 3
                },
                {
                    "text": "1. Tum Hi Ho - 2013\r\n2. Kabhi Jo Baadal Barse - 2013\r\n3. Sawan Aaya Hai - 2014\r\n4. Raabta (Siyaah Raatein) - 2012\r\n5. Hamari Adhuri Kahani - 2015\r\n6. Humdard - 2014\r\n7. Manwa Laage - 2014\r\n8. Phir Mohabbat - 2011\r\n9. Aaj Phir - 2014\r\n10. Suno Na Sangemarmar - 2014",
                    "title": "Top 10 Songs",
                    "sequence": 4
                }
            ],
            "dob": "25-04-1987",
            "fb": "",
            "twitter": "",
            "wiki": "http://en.wikipedia.org/wiki/Arijit_Singh",
            "availableLanguages": [
                "hindi",
                "bengali",
                "telugu",
                "punjabi",
                "english",
                "tamil",
                "unknown",
                "kannada",
                "marathi",
                "bhojpuri"
            ],
            "isRadioPresent": true
        },
    })
    useEffect(() => {

        params.id !== '' && createArtistDetails(params.id)
    }, [])
    const navigate = useNavigate()

    const page = 1;
    // const getHashFromURl = () => window.location.hash.replace("#", '')
    const createArtistDetails = async (id) => {
        await getRequest(configURL.artist + `?id=${id}`)
            .then(res => {
                setartist({ ...artist, details: res.data.data })
            })
            .catch(errors => {
                toast.error("😥someting went wrog");
            })
    }
    return (
        <>
            <div className="artistPage">
                <img className='img-fluid artistPage-img' src={getCorrectSrc(artist.details.image)} alt="" />
                <div className="artistPage-info">
                    <div onClick={() => { navigate(-1) }} className="back-icon ">
                        <Icons.BsArrowLeft />
                    </div>
                    <div className="row main-info">
                        <h3 className="text-left text-white name">
                            {artist.details.name} <span> <Icons.GoVerified /></span>
                        </h3>
                        <p className="  text-left mb-0 domaintype">
                            {artist.details.dominantType}
                        </p>
                    </div>
                    <div className=" followerCount">
                        <h4 className="count">
                            {nFormatter(artist.details.followerCount, 1)}+
                        </h4>
                        <h4 className='follower'>
                            followers
                        </h4>
                    </div>
                </div>
            </div>
            <div className="navbar">
                <NavLink index to={RouteStrings.artist + params.id + RouteStrings.artistDetails}
                    className={({ isActive }) =>
                        isActive ? "navbar-link active" : 'navbar-link'
                    }
                > Details</NavLink>
                <NavLink to={RouteStrings.artist + params.id + RouteStrings.artistSongs} className="navbar-link"> Songs</NavLink>
                <NavLink to={RouteStrings.artist + params.id + RouteStrings.artistAlbums} className="navbar-link"> Albums</NavLink>
            </div>
            <Outlet />
            <Toaster position='bottom' />
        </>
    )
}

export default Artist