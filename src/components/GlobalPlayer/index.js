// spell-checker:disable
import React, { useEffect, useRef, useState, startTransition } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { get } from "loadsh";

import {
    clearPlayList,
    currentPlaylist,
    currentTrack,
    removeTrackFromPlayList,
    setLocalPlayListData,
    setNextTrack,
    allFavoriteTracks,
    setPreviousTrack,
    setToFavoritesTracks,
    removeFromFavorites,
    setToRecentlyPlayedTracks
} from "../../Redux/Reducers/PlayList-slice";
import { configURL } from "../../apis/Base/config";
import { getRequest, postRequestWithInstence } from "../../apis/Base/serviceMethods";
import { Icons } from "../../assets/Icons";
import { ParseString } from "../../utils";
import RouteStrings from "../../utils/RouteStrings";
import PlayingAnime from "../Loader/PlayingAnime";
import SpotLoader from "../Loader/SpotLoader";
import "../SeekBar/style.scss";
import "./style.scss";
import { addtoRecentlyPlayedApi } from "../../apis/commonApiCalls/recentlyPlayed";
import { callremoveFromFavoriteApi } from "../SongStrip";
import AddToPlayListModal from "../AddToPlayListModal";
import Modal from 'react-bootstrap/Modal';


const GlobalPlayer = () => {
    const Constants = {
        isPlaying: 'isPlaying',
        showVolumeBar: 'showVolumeBar',
        isFavourite: 'isFavourite',
        isPrevious: 'isPrevious',
        isNext: 'isNext',
    }
    const intervalRef = useRef();
    const isReady = useRef(false);
    const progressBarRef = useRef();
    const dispatch = useDispatch()
    const trackList = useSelector(currentPlaylist);
    const allFavoriteTracksList = useSelector(allFavoriteTracks);
    const currenttrackDetails = useSelector(currentTrack);
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [trackDataList, settrackDataList] = useState([])
    const [currentDuration, setcurrentDuration] = useState('0')
    const [currentVolume, setcurrentVolume] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMegaPlayerON, setisMegaPlayerON] = useState(false);
    const [isLoopOn, setisLoopOn] = useState(false);
    const [ShowLyrics, setShowLyrics] = useState({
        state: false,
        data: {}
    });
    const [OpenPlaylist, setOpenPlaylist] = useState(false);
    const [playerState, setplayerState] = useState({
        isPlaying: false,
        showVolumeBar: false,
        isFavourite: false,
    })
    const [currentNewSong, setcurrentNewSong] = useState({});
    const [showAddToModal, setShowAddToModal] = useState(false)

    const [showAlert, setShowAlert] = useState(false)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        isRightSwipe && handlePrev();
        isLeftSwipe && handleNext();
    }



    const audioRef = useRef(new Audio(''));
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        settrackDataList(trackList);
    }, [trackList])

    const checkIsFavorite = () => {
        if (Object.values(currentNewSong).length > 0) {
            (allFavoriteTracksList.some((el) => el.id === currentNewSong.id)) && setplayerState({ ...playerState, isFavourite: true })
            return allFavoriteTracksList.some((el) => el.id === currentNewSong.id)
        }
    }

    useEffect(() => {
        LoadSongAndPlay()
        getSongLyrics()
    }, [currenttrackDetails.data])
    useEffect(() => {
        checkIsFavorite();
    }, [currentNewSong, isMegaPlayerON])
    const LoadSongAndPlay = () => {
        if (Object.values(currenttrackDetails?.data).length > 0) {
            PauseTrack()
            const prevState = isPlaying
            setIsPlaying(!prevState);
            setCurrentIndex(currenttrackDetails?.songIndex)
            setcurrentNewSong(currenttrackDetails?.data);
            audioRef.current = new Audio(currenttrackDetails.data?.downloadUrl[currenttrackDetails.data?.downloadUrl?.length - 1]?.link)
            // audioRef.current = new Audio('https://assets.snapmuse.com/tracks/v/128/IEROD1903125.mp3');
            setTrackProgress(audioRef.current.currentTime);
            setIsPlaying(true)
            Playtrack()
            callRecentlyPlayedAPI(currenttrackDetails.data);
            dispatch(setToRecentlyPlayedTracks(currenttrackDetails.data))
        }
        else {
            toast('❌ No track Found to Play')
        }
    }
    const callRecentlyPlayedAPI = async (data) => {
        await addtoRecentlyPlayedApi(data).then(res => {
            // console.log("callRecentlyPlayedAPI res ==>", res);
        }).catch(err => {
            // console.log("callRecentlyPlayedAPI err ==> ", err);
        })
    }

    let totalDuration;
    if (audioRef?.current) {
        const { duration } = audioRef.current;
        const Sec = Math.floor(duration);
        // setcurrentNewSongTotalDuration(Sec);
        totalDuration = Sec
        if (progressBarRef?.current?.max) {
            progressBarRef.current.max = Sec
        }
    }



    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                // console.log("Song End");
                handleNext();
            } else {
                setTrackProgress(Math.floor(audioRef.current.currentTime));
                if (progressBarRef?.current?.value) {
                    progressBarRef.current.value = audioRef.current.currentTime;
                    updatePalyeTime()
                }
            }
        }, [1000]);
    };
    useEffect(() => {
        updatePalyeTime()
    }, [progressBarRef?.current])

    useEffect(() => {
        if (audioRef?.current?.src) {
            if (isPlaying) {
                Playtrack()
            } else {
                PauseTrack()
            }
        } else {
            // console.log(" else ", audioRef?.current?.src);
            if (isPlaying) {
                Playtrack()
            } else {
                PauseTrack()
            }
        }
    }, [isPlaying]);

    const Playtrack = () => {
        audioRef.current.play();
        startTimer();
    }
    const PauseTrack = () => {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
    }

    const handleNext = () => {
        setIsPlaying(((prevState) => !prevState))
        clearInterval(intervalRef.current);

        // console.log("trackDataList", trackDataList.length, trackDataList);
        // console.log("currenttrackDetails", currenttrackDetails);

        if (currenttrackDetails.songIndex < trackDataList.length - 1) {
            audioRef.current.pause();
            audioRef.current.src = ''
            dispatch(setNextTrack({ songIndex: currenttrackDetails.songIndex + 1, data: trackDataList[currenttrackDetails.songIndex + 1] }))
        }
        else {
            dispatch(setNextTrack({ songIndex: 0, data: trackDataList[0] }))
            audioRef.current.load()
            toast("➿ playing again ")
            LoadSongAndPlay()
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            toast.error("No Previous Song")
        }
        else if (currentIndex - 1 > 0) {
            dispatch(setPreviousTrack({ songIndex: currenttrackDetails.songIndex - 1, data: trackDataList[currenttrackDetails.songIndex - 1] }))
        }
        else {
            dispatch(setNextTrack({ songIndex: 0, data: trackDataList[0] }))
        };
    };

    const handleRangeChange = () => {
        if (audioRef?.current?.currentTime) {
            audioRef.current.currentTime = progressBarRef?.current?.value;
            updatePalyeTime()
        }
    }
    const updatePalyeTime = () => {
        setcurrentDuration(progressBarRef?.current?.value)
        progressBarRef.current?.style.setProperty('--seek-before-width', `${(progressBarRef.current.value / totalDuration * 100).toFixed(2)}%`)
    }


    const getSongLyrics = async () => {
        if (currenttrackDetails.data.hasLyrics === "true") {
            await getRequest(configURL.lyrics + currenttrackDetails.data.id).then(res => {
                setShowLyrics({ ...ShowLyrics, data: res.data.data })
            }).catch(err => {
                toast.error("somting went wrong ")
            })
        } else {

        }
    }

    const togglePlayList = () => {
        setOpenPlaylist(!OpenPlaylist)
    }
    const handleVolumeChange = (e) => {
        const { value } = e.target
        if (audioRef?.current?.volume >= 0) {
            audioRef.current.volume = value
            setcurrentVolume(value)
        }
    }
    const handleClick = () => {
        const prevState = isMegaPlayerON
        setisMegaPlayerON(!prevState);
    };



    useEffect(() => {
        setTimeout(() => {
            setplayerState({ ...playerState, showVolumeBar: false })
        }, 7000);
    }, [playerState.showVolumeBar == true])

    const getCorrectTimeForamt = (sec) => {
        const Trackduration = sec
        const minitue = Math.floor(Trackduration / 60);
        const secound = Math.floor(Trackduration % 60);
        const newDuration = (minitue < 10 ? `0${minitue}` : minitue) + ":" + (secound < 10 ? `0${secound}` : secound)
        return newDuration
    }

    const handleNaviagteToAblum = (id) => {
        navigate(RouteStrings.albums + id);
    };

    const handlePlayerState = (id, state, data = {}) => {
        startTransition(() => setplayerState({ ...playerState, [id]: !state }))

        if (id === Constants.isFavourite) {
            if (!checkIsFavorite) {
                dispatch(setToFavoritesTracks(currenttrackDetails.data));
                callFavoriteApi(currenttrackDetails.data)
            } else {
                dispatch(removeFromFavorites(currenttrackDetails?.data?.id));
                callremoveFromFavoriteApi(currenttrackDetails?.data?.id);
            }
        }
    }
    const handlePlayPlalistSong = (songData) => {
        dispatch(setLocalPlayListData(songData))
        togglePlayList()
    }
    const handleremoveTrack = (id) => {
        if (currentNewSong.id === id) {
            toast("cannot remove playing track")
        }
        else {
            dispatch(removeTrackFromPlayList(id))
        }
    }
    const handleShowConfimPopUp = () => setShowAlert(!showAlert)
    const OnClearPlayList = () => {

        dispatch(clearPlayList());
        setShowAlert(false)
    }
    const callFavoriteApi = async (data) => {
        await postRequestWithInstence(configURL.favorite, { "data": data }).then(res => {
            // console.log("res", res.data);
        }).catch(err => {
            // console.log('err=>0', err);
            toast.error("❌ failed to Add Favorites")
        })
    }
    const handleHideModal = () => {
        setShowAddToModal(() => !showAddToModal)
    }
    return (
        <>
            {currentNewSong?.id ?
                <>
                    <div
                        style={
                            {
                                background:
                                    `linear-gradient(rgb(30,30,30,0.8), rgb(30,30,30,1)), url(${currentNewSong?.image[2]?.link}) center/cover no-repeat `,
                            }
                        }
                        className={`player ${isMegaPlayerON ? "mega" : "mini "}`}
                    >
                        <>
                            <div className="tack_card ">
                                {isMegaPlayerON &&
                                    <>
                                        <div className="tack_card-topBar pt-1">
                                            <button
                                                onClick={handleClick}
                                                className="tack_card-topBar--icon-down"
                                            >
                                                <Icons.BsChevronDoubleDown />
                                            </button>
                                            <div className="tack_card-topBar--space">
                                                <div className="text-center text-white text-capitalize">
                                                    now playing
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => { togglePlayList() }}
                                                className="tack_card-topBar--icon">
                                                <Icons.SlPlaylist />
                                            </button>
                                        </div>
                                        <div className={`tack_card-playlist ${OpenPlaylist ? "active" : ''}`}>
                                            <div className="tack_card-playlist--top-bar">
                                                <button
                                                onClick={handleShowConfimPopUp}
                                                    className="btn closeBtn delete">
                                                    <Icons.BsTrashCan />
                                                </button>
                                                <button
                                                    onClick={() => { togglePlayList() }}
                                                    className="btn closeBtn">
                                                    <Icons.AiOutlineCloseCircle />
                                                </button>
                                            </div>
                                            <div className="current-songlist">
                                                {trackDataList?.map((item, ind) => {
                                                    return (
                                                        <>
                                                            <div key={ind} id={item?.id}
                                                                className={`current-songlist-card ${(currentNewSong.id === item.id) && 'current-palying'}`}
                                                            >
                                                                <img loading="lazy" onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null;
                                                                    currentTarget.src = Icons.defualtImage;
                                                                }}
                                                                    onClick={() => handleClick(item.id)}
                                                                    className="img-fluid current-songlist-card-img "
                                                                    src={get(item, 'image[0].link', Icons.defualtImage)} alt="album-art" />
                                                                <div
                                                                    onClick={() => handleClick(item.id)}
                                                                    className="current-songlist-card-info">
                                                                    <p className="current-songlist-card-info-songName"> {ParseString(item.name)}</p>
                                                                    <p className="current-songlist-card-info-artistName">{ParseString(item?.primaryArtists)}</p>
                                                                </div>
                                                                <div className="current-songlist-card-controls">
                                                                    {currentNewSong.id === item.id ? <PlayingAnime /> : <button
                                                                        onClick={() => handlePlayPlalistSong(item)}
                                                                        className='btn current-songlist-card-controls-btn '>
                                                                        <Icons.BsPlayFill />
                                                                    </button>}
                                                                    <button
                                                                        onClick={() => handleremoveTrack(item.id)}
                                                                        className='btn current-songlist-card-controls-btn'>
                                                                        <Icons.AiOutlineCloseCircle />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="tack_card-details">
                                        <div className="tack_card-details-albumart text-center"  >
                                            <img
                                                onTouchStart={onTouchStart}
                                                onTouchMove={onTouchMove}
                                                onTouchEnd={onTouchEnd}
                                                loading="lazy"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = Icons.defualtImage;
                                                }}
                                                    src={currentNewSong?.image[currentNewSong?.image.length - 1]?.link}
                                                    alt={currentNewSong?.image[currentNewSong?.image.length - 1]?.quality}
                                                className="img-fluid"
                                                style={{ transform: `translateX(${touchEnd})` }}
                                                />
                                            </div>
                                            <div className="tack_card-details-info  text-center">
                                                <h4 className="tack-name text-center text-truncate ">{ParseString(currentNewSong?.name)}</h4>
                                                <h5
                                                    className="tack-album-name text-center text-underline  text-truncate "
                                                    onClick={() => {
                                                        setisMegaPlayerON(!isMegaPlayerON);
                                                        handleNaviagteToAblum(currentNewSong?.album?.id);
                                                    }}
                                                >
                                                    Album <span>
                                                        <Icons.BsHeadphones />&nbsp;{currentNewSong?.playCount}
                                                    </span>
                                                </h5>
                                                <h5
                                                    className="tack-album-name text-center text-underline  text-truncate "
                                                    onClick={() => {
                                                        setisMegaPlayerON(!isMegaPlayerON);
                                                        handleNaviagteToAblum(currentNewSong?.album?.id);
                                                    }}
                                                >
                                                    {ParseString(currentNewSong?.primaryArtists)}
                                                </h5>
                                            </div>
                                            <div className={`tack_card-details-textTrack ${ShowLyrics.state && 'track-active'} text-center`}>
                                                <h4 className="tack_card-details-textTrack-lyrics">{ShowLyrics.data?.lyrics}</h4>
                                                <p className="text-muted">{ShowLyrics.data?.copyright}</p>
                                            </div>
                                        </div>
                                        <div className="tack_card-media-icons">
                                            <div className="volume-wrapper">
                                                <button
                                                    onClick={() => { handlePlayerState(Constants.showVolumeBar, playerState.showVolumeBar) }}
                                                    className="btn">
                                                <Icons.BsVolumeUp />
                                                </button>
                                                {playerState.showVolumeBar &&
                                                    <div className="vertical-input">
                                                        <input
                                                            tabIndex={0}
                                                            orient="vertical"
                                                            type="range"
                                                            step={0.1}
                                                            min={0}
                                                            max={1}
                                                            value={currentVolume}
                                                            className="volumeBar"
                                                            name="volume"
                                                            onChange={handleVolumeChange}
                                                        />
                                                    </div>
                                                }
                                            </div>

                                        <button
                                                onClick={() => { handlePlayerState(Constants.isFavourite, playerState.isFavourite,) }}
                                                className="btn">
                                                {playerState.isFavourite ? <Icons.BsHeartFill className="bs-heart-fill" color='#ff0000' /> : <Icons.BsHeart />}
                                            </button>
                                        {currentNewSong.hasLyrics === 'true' && <div onClick={() => {
                                                setShowLyrics({ ...ShowLyrics, state: !ShowLyrics.state })
                                        }} className="btn"> <Icons.BsLyricsNote />


                                        </div>
                                        }
                                        <button onClick={handleHideModal} className="btn">
                                            <Icons.BsListPlus fill="#ffffff84" />
                                        </button>

                                            <button onClick={() => {
                                                setisLoopOn(!isLoopOn)
                                            }} className={`btn ${isLoopOn ? 'loop-active' : ''}`} >
                                                <Icons.BsArrowRepeat />
                                            </button>
                                            <button className="btn">
                                                <Icons.BsShuffle />
                                            </button>
                                        </div>
                                    </>}
                                {isMegaPlayerON && <>
                                    <div className="tack_card-timeLine">
                                        <div className="timings">
                                            <p className="time">{
                                                !isNaN(trackProgress) ?
                                                    getCorrectTimeForamt(trackProgress) : "--:--"
                                            }</p>
                                            <p className="time">{
                                                !isNaN(totalDuration) ?
                                                    getCorrectTimeForamt(totalDuration) : "--:--"
                                            }</p>
                                        </div>
                                    </div>
                                </>}
                                <div className={isMegaPlayerON ? "mega-seekbar-wrapper" : "mini-seekbar-wrapper"}>
                                    <input
                                        disabled={!isMegaPlayerON}
                                        ref={progressBarRef}
                                        onChange={handleRangeChange}
                                        type='range'
                                        max={0}
                                        value={currentDuration}
                                        className="seekBar" />
                                </div>
                                {isMegaPlayerON ? <>
                                    <div className="tack_card-controls">
                                        <button
                                            onClick={() => { handlePrev() }}
                                            className="btn">
                                            <Icons.BsChevronBarLeft />
                                        </button>
                                        {isReady.current = true ?
                                            <button
                                                onClick={() => { setIsPlaying(!isPlaying) }}
                                                className="btn">
                                                {isPlaying ?
                                                    <Icons.BsPauseFill />
                                                    : <Icons.BsPlayFill />}
                                            </button>
                                            : <SpotLoader />
                                        }
                                        <button
                                            onClick={() => { handleNext() }}
                                            className="btn">
                                            <Icons.BsChevronBarRight />
                                        </button>
                                    </div>
                                </> : <>
                                    <div className="miniplayer-wrapper">
                                        <div
                                            onClick={handleClick}
                                            className="col-2 image">
                                            <img loading="lazy" onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = Icons.defualtImage;
                                            }}
                                                src={currentNewSong?.image[0]?.link}
                                                alt={currentNewSong?.image[0]?.quality}
                                                className="img-fluid albumart"
                                            />
                                        </div>
                                        <div
                                            onClick={handleClick}
                                            className="col-6 text-truncate  info">
                                            <h5 className=" trackName text-trucate ">{ParseString(currentNewSong?.name)}</h5>
                                            <p className=" artists text-trucate"> {ParseString(currentNewSong?.primaryArtists)}</p>
                                        </div>
                                        <div className="col-4  controls">
                                            <button
                                                onClick={() => { handlePrev() }}
                                                className="btn">
                                                <Icons.BsChevronBarLeft />
                                            </button>
                                            {isReady.current = true ?
                                                <button
                                                    onClick={() => { setIsPlaying(!isPlaying) }}
                                                    className="btn">
                                                    {isPlaying ?
                                                        <Icons.BsPauseFill />
                                                        : <Icons.BsPlayFill />}
                                                </button>
                                                : <SpotLoader />
                                            }
                                            <button
                                                onClick={() => { handleNext() }}
                                                className="btn">
                                                <Icons.BsChevronBarRight />
                                            </button>
                                        </div>
                                    </div>
                                </>}
                            </div>
                        </>
                    </div>
                </>
                : <><SpotLoader />
                </>}
            <Toaster
                position="bottom-center"
            />
            <AddToPlayListModal showAddToModal={showAddToModal} handleHideModal={handleHideModal} songData={currentNewSong} />

            <Modal className='confirm-mainModal'
                show={showAlert}
                centered >
                <div style={{ minHeight: '10rem', height: '10rem' }}
                    className="confirm-modal-container mx-3">
                    <div className="confirm-modalHeader">
                        <div className="confirm-modalName">ALERT !</div>
                        <button onClick={handleShowConfimPopUp} className="btn closeBtn">
                            <Icons.AiOutlineCloseCircle />
                        </button>

                    </div>
                    <div className="confirm-modalBody mt-3">
                        <div className="confirm-modalContent">
                            <p className="text-white text-sm text-center">
                                All Tracks will be removed. Do you want to Continue !
                            </p>
                        </div>
                        <div className="modalCts ">
                            <button onClick={OnClearPlayList} className="btn  btn-sm btn-danger">
                                Stop
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    );
};

export default GlobalPlayer;
