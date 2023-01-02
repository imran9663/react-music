import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setLocalPlayListData } from "../../Redux/Reducers/PlayList-slice";
import { configURL } from "../../apis/Base/config";
import { getRequest } from "../../apis/Base/serviceMethods";
import { Icons } from "../../assets/Icons";
import { ParseString } from "../../utils";
import RouteStrings from "../../utils/RouteStrings";
import "./style.scss";
import Loader from "./Loader";
import { Toaster, toast } from "react-hot-toast";
const Song = () => {
    const naviagte = useNavigate();
    const { id } = useParams()
    const dispatch = useDispatch()
    const [songData, setsongData] = useState([]);
    const [albumSongs, setalbumSongs] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        getSongDetails()
    }, []);


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
                            <img onError={({ currentTarget }) => {
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
                                By <br /> {songData[0].primaryArtists}
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
                            <button onClick={handlePlaySong} className="btn btn-rounded  play "> <Icons.BsPlayFill fill="#ffffff" size={28} /></button>
                            <button className="btn btn-rounded heart  ">
                                <Icons.BsHeart size={28} />
                                {/* <Icons.BsHeartFill fill="#ff0000" size={28} /> */}
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
