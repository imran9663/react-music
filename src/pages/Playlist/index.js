import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { getRequest } from "../../apis/Base/serviceMethods";
import { configURL } from "../../apis/Base/config";
import "./style.scss";
import { Icons } from "../../assets/Icons";
import RouteStrings from "../../utils/RouteStrings";
import Loader from "../../components/Loader/Index";
import { useDispatch, useSelector } from "react-redux";
import {
    setLocalPlayListData,
    currentPlaylist,
} from "../../Redux/Reducers/PlayList-slice";
const PlayList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [playlistData, setplaylistData] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const tracks = useSelector(currentPlaylist);

    useEffect(() => {
        getPlaylistdata();
    }, []);
    const getPlaylistdata = async () => {
        setisLoading(true);
        await getRequest(configURL.playlist + id)
            .then((res) => {
                setplaylistData(res?.data?.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setisLoading(false);
            });
    };
    const handleClick = (id) => {
        navigate(RouteStrings.song + id);
    };
    const handlePlaySong = (songData) => {
        dispatch(setLocalPlayListData(songData));
    };
    const handlePlayAlbum = () => {
        dispatch(setLocalPlayListData(playlistData.songs));
    };
    return (
        <>
            {isLoading ? (
                <h2 className="text-light">
                    <Loader />
                </h2>
            ) : (
                <div className=" d-flex flex-column playlist-container">
                    {Object.keys(playlistData).length > 0 && (
                        <>
                            <div className="hero">
                                <img
                                    className=" hero-image"
                                    src={
                                        playlistData?.image[playlistData?.image.length - 1]?.link
                                    }
                                    alt="hero "
                                />
                                <div className="hero-overlay"></div>
                            </div>
                            <div className="playlist-info">
                                <div className="col-4 image-cover">
                                    <img
                                        src={playlistData?.image[0]?.link}
                                        alt=""
                                        className="prfilethumb"
                                    />
                                </div>
                                <div className=" col-8 playlist-info-headings">
                                    <h4 className="text-capitalize text-white mt-2">
                                        {playlistData?.name}
                                    </h4>
                                    <p className="userName">
                                        {playlistData?.userId ? `@${playlistData?.userId}` : `--`}
                                    </p>
                                    <div className="playlist-rating">
                                        <div className="rate-cont icon-svg">
                                            <Icons.BsMusicNote />
                                            <p className="text-white">{playlistData.songCount}</p>
                                        </div>
                                        <div className="rate-cont icon-svg">
                                            <Icons.AiOutlineUser />
                                            <p className="text-white">
                                                {playlistData.fanCount ? playlistData.fanCount : "--"}
                                            </p>
                                        </div>
                                        <div className="rate-cont icon-svg">
                                            <Icons.BsHeart />
                                            <p className="text-white">
                                                {playlistData.followerCount
                                                    ? playlistData.followerCount
                                                    : "--"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 play-button-wrapper">
                                <button onClick={handlePlayAlbum} className="btn round_btn">
                                    <Icons.BsPlayFill />
                                </button>
                            </div>
                            <div className="songlist">
                                {playlistData?.songs.map((item) => {
                                    return (
                                        <>
                                            <div
                                                id={item?.id}
                                                key={item?.id}
                                                className="songlist-card"
                                            >
                                                <img
                                                    onClick={() => handleClick(item.id)}
                                                    className="img-fluid songlist-card-img "
                                                    src={item?.image[0].link}
                                                    alt="album-art"
                                                />
                                                <div
                                                    onClick={() => handleClick(item.id)}
                                                    className="songlist-card-info"
                                                >
                                                    <p className="songlist-card-info-songName">
                                                        {" "}
                                                        {item.name}
                                                    </p>
                                                    <p className="songlist-card-info-artistName">
                                                        {item?.primaryArtists}
                                                    </p>
                                                </div>
                                                <div className="songlist-card-controls">
                                                    <button
                                                        onClick={() => handlePlaySong(item)}
                                                        className="btn songlist-card-controls-btn "
                                                    >
                                                        <Icons.BsPlayFill />
                                                    </button>
                                                    <button className="btn songlist-card-controls-btn">
                                                        <Icons.BsThreeDotsVertical />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default PlayList;
