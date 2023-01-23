import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { allFavoriteTracks, removeFromFavorites, setLocalPlayListData, setToFavoritesTracks } from "../../Redux/Reducers/PlayList-slice";
import { configURL } from "../../apis/Base/config";
import { getRequest } from "../../apis/Base/serviceMethods";
import { Icons } from "../../assets/Icons";
import { ParseString } from "../../utils";
import RouteStrings from "../../utils/RouteStrings";
import "./style.scss";
import Loader from "./Loader";
import { Toaster, toast } from "react-hot-toast";
import { callFavoriteApi, callremoveFromFavoriteApi } from "../../components/SongStrip";
const Song = () => {
    const naviagte = useNavigate();
    const { id } = useParams()
    const dispatch = useDispatch()
    const allFavoriteTracksList = useSelector(allFavoriteTracks);
    const [songData, setsongData] = useState([]);
    const [trackArtists, settrackArtists] = useState([]);
    const [albumSongs, setalbumSongs] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        getSongDetails()
    }, []);
    useEffect(() => {
        if (songData.length > 0) {
            getAllArtistwithid();
            checkIsFavorite()
        }
    }, [songData]);
    const [isFavorite, setisFavorite] = useState(false)
    const checkIsFavorite = () => {
        if (songData.length > 0) {
            (allFavoriteTracksList.some((el) => el.id === songData[0].id)) && setisFavorite(true)
        }
    }
    const getSongDetails = async () => {
        setisLoading(true);
        await getRequest(configURL.song + id).then(res => {
            setsongData(res.data.data);
        }).catch(err => {
            console.log("getSongDetails err", err);
        }).finally(() => {
            setisLoading(false);
        })
    };
    const getSongsFromAlbum = async () => {
        if (songData[0].album.id) {
            await getRequest(configURL.albums + songData[0].album.id).then(res => {
                setalbumSongs(res.data.data);
            }).catch(err => {
                toast.error("Someting Went Wrong ")
            }).finally(() => {
                setisLoading(false);
            })
        }

    }
    function handleClick (id) {
        naviagte(RouteStrings.albums + id);
    }
    const handleGoBack = () => {
        naviagte(-1)
    }
    const handlePlaySong = () => {
        dispatch(setLocalPlayListData(songData[0]))
    }
    const handleFavorite = async () => {
        const prevState = isFavorite;
        if (prevState === true) {
            setisFavorite(false)
            dispatch(removeFromFavorites(songData[0]?.id));
            callremoveFromFavoriteApi(songData[0]?.id);
        }
        if (prevState === false) {
            dispatch(setToFavoritesTracks(songData[0]));
            await callFavoriteApi(songData[0]);
            setisFavorite(true);
        }
    }
    const getAllArtistwithid = () => {
        console.log("songData", songData);
        const artistArr = songData[0]?.primaryArtists.split(', ')
        const artistIDArr = songData[0]?.primaryArtistsId.split(', ')
        const newobjArr = []
        artistArr.map((item, ind) => {
            const obj = { name: item, id: artistIDArr[ind] }
            newobjArr.push(obj)
            return newobjArr
        })
        settrackArtists(newobjArr)
    }
    return (
        <>
            {isLoading && <div className="loadingwrapper">
                <Loader />
            </div>}
            {
                songData.length > 0 ? <>
                    <div className="song_warpper">
                        <div className="song_warpper-top-bar">
                            <button onClick={handleGoBack} className="btn back-btn">
                                <Icons.BsArrowLeft />
                            </button>
                            <button className="btn">
                                <Icons.BsThreeDotsVertical />
                            </button>
                        </div>
                        <div className="song_warpper-albumart">
                            <img loading="lazy" onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = Icons.defualtImage;
                            }}
                                src={songData[0].image[songData[0].image.length - 1].link}
                                alt={songData[0].image[songData[0].image.length - 1].link}
                                className="img-fluid"
                            />
                        </div>
                        <div className="song_warpper-info">
                            <h4 className="track-name mb-3">{ParseString(songData[0].name)}</h4>
                            {/* <h5 onClick={() => { handleClick(songData[0].album.id) }} className="track-album">
                        <span><Icons.BiAlbum />&nbsp;</span>{ParseString(songData[0].album.name)}
                    </h5> */}

                            <p className="artists">
                                By <br />

                                {trackArtists?.map(((item) => {
                                    return (
                                        <span key={item.id} onClick={() => { naviagte(RouteStrings.artist + item.id) }} className=" px-1">
                                            {item.name},
                                        </span>
                                    )
                                }))}
                            </p>
                            <div className="cont">
                                <p className="language">
                                    {songData[0].language}
                                    <span>
                                        <Icons.RxDot />
                                    </span>
                                </p>
                                <p className="playCount">{songData[0].playCount} played</p>
                            </div>
                        </div>
                        <div className="song_warpper-action-btns">
                            {songData[0]?.downloadUrl?.length > 0
                                &&
                                <button onClick={handlePlaySong} className="btn btn-rounded  play "> <Icons.BsPlayFill fill="#ffffff" size={28} /></button>
                            }

                            <button onClick={handleFavorite} className="btn btn-rounded heart  ">
                                {isFavorite ? <Icons.BsHeartFill className="bs-heart-fill"
                                    fill="#ff0000" size={28} /> :
                                    <Icons.BsHeart size={28} />}
                            </button>
                        </div>
                    </div>
                </> : null
            }
            <Toaster position="bottom" />
        </>
    );
};

export default Song;
