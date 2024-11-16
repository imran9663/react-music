import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { getRequest } from "../../apis/Base/serviceMethods";
import { configURL } from "../../apis/Base/config";
import "./style.scss";
import { Icons } from "../../assets/Icons";
import RouteStrings from "../../utils/RouteStrings";
import { useDispatch, useSelector } from "react-redux";
import {
    setLocalPlayListData,
    currentPlaylist,
} from "../../Redux/Reducers/PlayList-slice";
import { Toaster, toast } from "react-hot-toast";
import SongStrip from "../../components/SongStrip";
import SongStripeLoader from "../../components/Loader/SongStripeLoader";
import BannerLoader from "../../components/Loader/BannerLoader";
import Topbar from "../../components/Topbar";
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
                if (res?.data?.data !== null) {
                    setplaylistData(res?.data?.data);

                } else {
                    toast.loading('No Data');
                }
            })
            .catch((err) => {
                toast.error('Something went wrong!..');
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

            ) : (
                <div className=" d-flex flex-column playlist-container">
                    {Object.keys(playlistData).length > 0 && (
                        <>
                            <div className="hero">
                                <img loading="lazy" onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = Icons.defualtImage;
                                }}
                                    className=" hero-image"
                                    src={
                                        playlistData?.image[playlistData?.image.length - 1]?.link
                                    }
                                    alt="hero "
                                />
                                <div className="hero-overlay"></div>
                            </div>

                            <Topbar tbClassName={'tbar'} />
                                <div className="playlist-info mx-3">
                                <div className="col-4 image-cover">
                                    <img loading="lazy" onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = Icons.defualtImage;
                                    }}
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
                            {playlistData?.songs.length > 0 && <div className="w-100 play-button-wrapper">
                                <button onClick={handlePlayAlbum} className="btn round_btn">
                                    <Icons.BsPlayFill />
                                </button>
                            </div>}

                                <div className="songlist mx-3">
                                {playlistData?.songs.length > 0 ? <>
                                    {playlistData?.songs.map((item, ind) => {
                                        return (
                                            <>
                                                <SongStrip key={ind} data={item} />
                                            </>
                                        );
                                    })}
                                </> : <>
                                    <div className="nosongs_wrapper">
                                        <img loading="lazy" onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = Icons.defualtImage;
                                        }} className="img-fluid" src={Icons.mello} alt="no data found " />
                                        <h4 className="text-light mt-2">No Songs Found</h4>
                                    </div>

                                </>}

                            </div>
                        </>
                    )}
                </div>
            )}
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />

        </>
    );
};

export default PlayList;
