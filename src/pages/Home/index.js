// spell-checker:disable

import React, { useEffect, useState } from "react";
import { configURL } from "../../apis/Base/config";
import {
    getRequest,
    getRequestWithInstence,
} from "../../apis/Base/serviceMethods";
import { Icons } from "../../assets/Icons";
import SlideLoader from "../../components/Loader/SlideLoader";
import MusicSlider from "../../components/MusicSlider";
import RoundCard from "../../components/RoundCard";
import SongStrip from "../../components/SongStrip";
import topArtist from "../../utils/data/index.json";
import { loaclStorageStrings } from "../../utils/localStorageStrings";
import "./style.scss";
import { Toaster, toast } from "react-hot-toast";
import {
    allFavoriteTracks,
    allRecentlyPlayedTracks,
    setToFavoritesTracks,
    setToRecentlyPlayedTracks,

    setAllUserPlaylists,
    allUserPlaylists
} from "../../Redux/Reducers/PlayList-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PlayListCard from "../../components/PlayListCard";
import RouteStrings from "../../utils/RouteStrings";
import { sliderSettings } from "../../utils";
import Slider from "react-slick";
const Home = () => {
    const [loading, setLoading] = useState({
        isTrendingSectionLoading: false,
        isFavoriteLoading: false,
        isUserPlaylistLoading: false,
        isRecentlyPlayedLoading: false,
    });
    // // const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
    const [name, setName] = useState("");
    const [HomePageData, setHomePageData] = useState({
        albums: [],
        charts: [],
        playlists: [],
        trenadingAlbums: [],
        trenadingSongs: [],
        userPlayList: [],
    });
    const [favoriteData, setFavoriteData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allFavoriteTracksList = useSelector(allFavoriteTracks);
    const recentlyPlayedList = useSelector(allRecentlyPlayedTracks);
    const allUserPlaylistsData = useSelector(allUserPlaylists);
    useEffect(() => {
        getLocalStorageLang();
        recentlyPlayedList.length === 0 && getRecentlyPlayedData();
    }, []);
    useEffect(() => {
        setFavoriteData(allFavoriteTracksList);
    }, [allFavoriteTracksList]);


    const getLocalStorageLang = () => {
        const { language, fullName, _id } = JSON.parse(
            localStorage.getItem(loaclStorageStrings.profileInfo)
        );
        setName(fullName.split(" ")[0]);
        allFavoriteTracksList.length === 0 && getFavoriteData(_id);
        language?.length > 0 && getHomePageData(language);
        getAllPlayLists(_id);
    };

    const getHomePageData = async (arg) => {
        setLoading({ ...loading, isTrendingSectionLoading: true });
        await getRequest(configURL.homePage + arg)
            .then((res) => {
                setHomePageData({
                    ...HomePageData,
                    albums: res?.data?.data.albums,
                    charts: res?.data?.data.charts,
                    playlists: res?.data?.data.playlists,
                    trenadingAlbums: res?.data?.data.trending.albums,
                    trenadingSongs: res?.data?.data.trending.songs,
                });
            })
            .catch((err) => {
                console.log("getHomePageData err", err);
            })
            .finally(() => {
                setLoading({ ...loading, isTrendingSectionLoading: false });
            });
    };
    const getFavoriteData = async (userId) => {
        setLoading({ ...loading, isFavoriteLoading: true });
        await getRequestWithInstence(`${configURL.favorite}/${userId}`)
            .then((res) => {
                if (res.status === 200) {
        //add data to redux
                    dispatch(setToFavoritesTracks(res.data.data));
                }
                res.status === 201 && toast("No Favorites");
            })
            .catch((err) => {
                console.log("err", err);
                toast.error("error in fecthing Favorite");
            })
            .finally(() => {
                setLoading({ ...loading, isFavoriteLoading: false });
            });
    };
    const getRecentlyPlayedData = async () => {
        await getRequestWithInstence(configURL.recentlyPlayed)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setToRecentlyPlayedTracks(res.data.data));
                }
                res.status === 201 && toast("No Favorites");
            })
            .catch((err) => {
                console.log("err", err);
                toast.error("error in fecthing Favorite");
            })
            .finally(() => {
                setLoading({ ...loading, isRecentlyPlayedLoading: false });
            });
    };

    const handleSeeAll = () => {
        navigate("/myMusic/myFavorites");
    };
    const handleRouteToPlaylist = (id) => {
        navigate(RouteStrings.userPlaylist + id)
    }
    const getAllPlayLists = async (userId) => {
        await getRequestWithInstence(`${configURL.getAllPlayListsByUser}/${userId}`)
            .then((result) => {
                if (result.status === 200) {
                    dispatch(setAllUserPlaylists(result?.data?.data))
                }
            })
            .catch((err) => {
                toast.error("❌ error in fetching User Playlist");
            });
    };
    const artistLength = 7;
    return (
        <>
            <div className="homewrapper">
                <section className="banner-wrapper">
                    <div className="banner">
                        <div className="hello">
                            Hello
                            <span className="px-2 text-capitalize tracking-in-expand">{name}</span>
                        </div>
                    </div>
                    {/* <div className="trendingWrapper">
                        <h2 className='text-light  text-capitalize trending'>Trending</h2>
                    </div> */}
                    {loading.isTrendingSectionLoading ? (
                        <SlideLoader />
                    ) : (
                        HomePageData?.trenadingAlbums?.length > 0 && (
                                <>
                                <>
                                    <div className="m-3">
                                        {/* <h5 className="text-light mt-3 mx-3 text-capitalize">
                                            Trending albums
                                        </h5> */}
                                        <MusicSlider data={HomePageData?.trenadingAlbums} />
                                    </div>
                                </>
                            </>
                            )
                    )}
                </section>
                {
                    allUserPlaylistsData?.playlists?.length > 0 &&
                    <section className="mx-3 mt-3 pt-3 pb-0">
                        <h4 className="text-light mb-3 text-capitalize">My Playlists</h4>
                        <Slider {...sliderSettings}>
                            {allUserPlaylistsData.playlists?.map((card, ind) => (
                                <PlayListCard
                                    CreatedBy={allUserPlaylistsData?.createdBy}
                                    CreatedAt={allUserPlaylistsData.createdAt}
                                    OnClickOnPlayList={handleRouteToPlaylist}
                                    data={card} />
                            ))}
                        </Slider>
                    </section>
                }

                {loading.isTrendingSectionLoading ? (
                    <SlideLoader />
                ) : (
                    HomePageData?.trenadingSongs?.length > 0 && (
                        <>
                                <h5 className="text-light   mx-3 pt-2  pb-2 text-capitalize">
                                    Trending Songs
                                </h5>
                                <>
                                    <div className="homepage-songlist mx-3">
                                        {HomePageData?.trenadingSongs.map((item, ind) => {
                                            return <SongStrip key={ind} data={item} />;
                                        })}
                                    </div>
                                </>
                            </>
                    )
                )}
                {loading.isFavoriteLoading ? (
                    <SlideLoader />
                ) : (
                    favoriteData?.length > 0 && (
                        <>
                                <div className=" mx-3 d-flex flex-row justify-content-between align-items-center my-3 ">
                                <h5 className="text-light  mx-3 text-capitalize mb-0">
                                    Favorite Tracks
                                </h5>
                                    <button
                                        onClick={handleSeeAll}
                                        className="btn btn-primary-accent"
                                    >
                                        see all{" "}
                                        <span>
                                            <Icons.BsArrowRight />
                                        </span>
                                    </button>
                                </div>

                                <>
                                    <div className="homepage-songlist mx-3">
                                        {favoriteData.map((item, ind) => {
                                            return <SongStrip key={ind} data={item} />;
                                        })}
                                    </div>
                                </>
                            </>
                    )
                )}
                {loading.isTrendingSectionLoading ? (
                    <SlideLoader />
                ) : (
                    HomePageData?.albums?.length > 0 && (
                            <section className="my-3 mx-3">
                            <h5 className="text-light text-capitalize">Albums</h5>
                            <MusicSlider data={HomePageData?.albums} />
                        </section>
                    )
                )}
                <section className="mb-2">
                    <h4 className="text-light mx-3 text-capitalize ">top artists</h4>
                    <div className="artist-wrapper">
                        {topArtist.map((item, ind) => {
                            if (ind <= artistLength) {
                                return (
                                    <>
                                        <RoundCard key={ind} item={item} />
                                    </>
                                );
                            }
                        })}
                        <button
                            onClick={() => {
                                console.log("open all artist page");
                            }}
                            className="btn btn-lg  text-center text-light text round-circle"
                        >
                            See All
                            <Icons.BsArrowRight />
                        </button>
                    </div>
                </section>

                {HomePageData?.charts?.length > 0 && (
                    <section className="mb-3 mx-3">
                        <h4 className="text-light mb-3 text-capitalize">Charts</h4>
                        {loading.isTrendingSectionLoading ? (
                            <SlideLoader />
                        ) : (
                            <MusicSlider isSquare={true} data={HomePageData?.charts} />
                        )}
                    </section>
                )}
                {HomePageData?.playlists?.length > 0 && (
                    <section className="mb-3 mx-3">
                        <h4 className="text-light mb-3  text-capitalize"> Suggested Playlists</h4>
                        {loading.isTrendingSectionLoading ? (
                            <SlideLoader />
                        ) : (
                            <MusicSlider data={HomePageData?.playlists} />
                        )}
                    </section>
                )}


            </div>
            <div className="p-5 m-5">
                <div className="null opacity-0"></div>
            </div>
            <Toaster position="bottom" />
        </>
    );
};

export default Home;
