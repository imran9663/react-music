import React, { useEffect, useState } from "react";
import { configURL } from "../../apis/Base/config";
import { getRequest, getRequestWithInstence } from "../../apis/Base/serviceMethods";
import { Icons } from "../../assets/Icons";
import SlideLoader from "../../components/Loader/SlideLoader";
import MusicSlider from "../../components/MusicSlider";
import RoundCard from "../../components/RoundCard";
import SongStrip from "../../components/SongStrip";
import topArtist from "../../utils/data/index.json";
import { loaclStorageStrings } from "../../utils/localStorageStrings";
import "./style.scss";
import { Toaster, toast } from "react-hot-toast";
import { allFavoriteTracks, allRecentlyPlayedTracks, setToFavoritesTracks, setToRecentlyPlayedTracks } from "../../Redux/Reducers/PlayList-slice";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
    const [isLoading, setisLoading] = useState(false);
    const [isFavoriteLoading, setisFavoriteLoading] = useState(false);
    const [name, setname] = useState("");
    const [HomePageData, setHomePageData] = useState({
        albums: [],
        charts: [],
        playlists: [],
        trenadingAlbums: [],
        trenadingSongs: [],
    });
    const [favoriteData, setfavoriteData] = useState([]);
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const allFavoriteTracksList = useSelector(allFavoriteTracks);
    const recentlyPlayedList = useSelector(allRecentlyPlayedTracks);
    useEffect(() => {
        getLoaclStorageLang();
        allFavoriteTracksList.length === 0 && getFavoriteData();
        recentlyPlayedList.length === 0 && getRecentlyPlayedData();
    }, []);
    useEffect(() => {
        setfavoriteData(allFavoriteTracksList)
    }, [allFavoriteTracksList])

    const getLoaclStorageLang = () => {
        const { language, fullName } = JSON.parse(
            localStorage.getItem(loaclStorageStrings.profileInfo)
        );
        setname(fullName.split(" ")[0]);
        language?.length > 0 && getHomePageData(language);
    };

    const getHomePageData = async (arg) => {
        setisLoading(true);
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
                setisLoading(false);
            });
    };
    const getFavoriteData = async () => {
        setisFavoriteLoading(true);
        await getRequestWithInstence(configURL.favorite).then(res => {
            if (res.status === 200) {
                //add data to redux
                dispatch(setToFavoritesTracks(res.data.data))
            }
            res.status === 201 && toast("No Favorites")
        }).catch(err => {
            console.log("err", err);
            toast.error("error in fecthing Favorite")
        }).finally(() => {
            setisFavoriteLoading(false)
        })
    }
    const getRecentlyPlayedData = async () => {
        await getRequestWithInstence(configURL.recentlyPlayed).then(res => {
            if (res.status === 200) {
                dispatch(setToRecentlyPlayedTracks(res.data.data))
            }
            res.status === 201 && toast("No Favorites")
        }).catch(err => {
            console.log("err", err);
            toast.error("error in fecthing Favorite")
        }).finally(() => {
            setisFavoriteLoading(false)
        })
    }
    const artistLength = 7;
    return (
        <>
            <div className="homewrapper">
                <section className="banner-wrapper">
                    <div className="banner">
                        <div className="hello">
                            Hello <span className="text-capitalize tracking-in-expand">{name}</span>
                        </div>
                    </div>
                    {/* <div className="trendingWrapper">
                        <h2 className='text-light  text-capitalize trending'>Trending</h2>
                    </div> */}
                    {isLoading ? (
                        <SlideLoader />
                    ) :
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
                        )}

                </section>
                {isLoading ? (
                    <SlideLoader />
                ) :
                    HomePageData?.trenadingSongs?.length > 0 &&
                    <>
                        <h5 className="text-light  mx-3 text-capitalize">
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
                }
                {isFavoriteLoading ?
                    (
                        <SlideLoader />
                    ) :
                    favoriteData?.length > 0 &&
                    <>
                        <div className=" mx-3 d-flex flex-row justify-content-between align-items-center">
                            <h5 className="text-light  mx-3 text-capitalize">
                                Favorite Tracks
                            </h5>
                            <button className="btn see-all">see all <span><Icons.BsArrowRight /></span></button>
                        </div>

                        <>
                            <div className="homepage-songlist mx-3">
                                {favoriteData.map((item, ind) => {
                                    return <SongStrip key={ind} data={item} />;
                                })}
                            </div>
                        </>
                    </>
                }
                {isLoading ?
                    <SlideLoader />
                    :
                    HomePageData?.albums?.length > 0 &&
                    <section className="mb-5 mx-3">
                        <h5 className="text-light text-capitalize">Albums</h5>
                        <MusicSlider data={HomePageData?.albums} />
                    </section>
                }
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
                        {isLoading ? (
                            <SlideLoader />
                        ) : (
                            <MusicSlider isSquare={true} data={HomePageData?.charts} />
                        )}
                    </section>
                )}
                {HomePageData?.playlists?.length > 0 && (
                    <section className="mb-3 mx-3">
                        <h4 className="text-light mb-3  text-capitalize">Playlists</h4>
                        {isLoading ? (
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
