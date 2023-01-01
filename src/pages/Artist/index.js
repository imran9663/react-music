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
import BannerLoader from '../../components/Loader/BannerLoader';
import SongStripeLoader from '../../components/Loader/SongStripeLoader';

const Artist = () => {
    const params = useParams();
    const [artist, setartist] = useState({
        details: {},
    })
    const [isLoding, setisLoding] = useState(false)
    useEffect(() => {
        params.id !== '' && createArtistDetails(params.id)
    }, [])
    const navigate = useNavigate()

    const createArtistDetails = async (id) => {
        setisLoding(true)
        await getRequest(configURL.artist + `?id=${id}`)
            .then(res => {
                setartist({ ...artist, details: res.data.data })
            })
            .catch(errors => {
                toast.error("😥someting went wrog");
            }).finally(() => {
                setisLoding(false)
            })
    }
    return (
        <>
            {isLoding ?
                <>
                    <BannerLoader />
                    <br />
                    <SongStripeLoader />
                </>
                :
                <>
                    <div className="artistPage">

                        <img className='img-fluid artistPage-img' src={getCorrectSrc(artist?.details?.image)} alt="profile pic" />
                        <div className="artistPage-info">
                            <div onClick={() => { navigate(-1) }} className="back-icon ">
                                <Icons.BsArrowLeft />
                            </div>
                            <div className="row main-info">
                                <h3 className="text-left text-white name">
                                    {artist?.details?.name} <span> <Icons.GoVerified /></span>
                                </h3>
                                <p className="  text-left mb-0 domaintype">
                                    {artist?.details?.dominantType}
                                </p>
                            </div>
                            <div className=" followerCount ">
                                <button className="btn follow-button">Follow</button>
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
                </>}
            <Toaster position='bottom' />
        </>
    )
}

export default Artist