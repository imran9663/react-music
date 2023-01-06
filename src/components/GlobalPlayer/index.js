import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearPlayList, currentPlaylist, currentTrack, removeTrackFromPlayList, setLocalPlayListData, setNextTrack, setPreviousTrack } from "../../Redux/Reducers/PlayList-slice";
import { configURL } from "../../apis/Base/config";
import { getRequest } from "../../apis/Base/serviceMethods";
import { Icons } from "../../assets/Icons";
import { ParseString } from "../../utils";
import RouteStrings from "../../utils/RouteStrings";
import PlayingAnime from "../Loader/PlayingAnime";
import SpotLoader from "../Loader/SpotLoader";
import "../SeekBar/style.scss";
import "./style.scss";


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
    const trackList = useSelector(currentPlaylist)
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

    var audioSrc = trackDataList[currentIndex]?.downloadUrl[trackDataList[currentIndex]?.downloadUrl?.length - 1]?.link;
    const audioRef = useRef(new Audio(trackList[0]?.downloadUrl[trackDataList[currentIndex]?.downloadUrl?.length - 1]?.link));

    useEffect(() => {
        settrackDataList(trackList)
        setCurrentIndex(currenttrackDetails?.songIndex)
        setcurrentNewSong(currenttrackDetails.data);

    }, [trackList, currenttrackDetails])
    useEffect(() => {
        LoadSongAndPlay()
    }, [currenttrackDetails])
    const [currentNewSong, setcurrentNewSong] = useState({});
    const LoadSongAndPlay = () => {
        setCurrentIndex(currenttrackDetails?.songIndex)
        setcurrentNewSong(currenttrackDetails.data);
    }
    useEffect(() => {
        setcurrentNewSong(trackDataList[currentIndex]);
        getSongLyrics()
    }, [currentIndex, trackDataList]);

    const { duration } = audioRef.current;
    const Sec = Math.floor(duration);
    if (progressBarRef?.current?.max) {
        progressBarRef.current.max = Sec
    }

    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(Math.floor(audioRef.current.currentTime));
                if (progressBarRef?.current?.value) {
                    progressBarRef.current.value = audioRef.current.currentTime;
                }
                updatePalyeTime()
            }
        }, [1000]);
    };

    useEffect(() => {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        } else {
            if (isPlaying) {
                audioRef.current = new Audio(audioSrc);
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentNewSong]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);
        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [currentIndex, currentNewSong]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    const handleNext = () => {
        if (currentIndex < trackDataList.length - 1) {
            dispatch(setNextTrack({ songIndex: currenttrackDetails.songIndex + 1, data: trackDataList[currenttrackDetails.songIndex + 1] }))
        } else {
            dispatch(setNextTrack({ songIndex: 0, data: trackDataList[0] }))
        }
    };

    const handlePrev = () => {
        if (currentIndex - 1 < 0) {
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
        progressBarRef.current?.style.setProperty('--seek-before-width', `${progressBarRef.current.value / duration * 100}%`)
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
    const GetVolumeIcons = () => {
        if (currentVolume >= 0.9) {
            return <Icons.BsVolumeUp />
        }
        if (currentVolume <= 0.8 && currentVolume >= 0.1) {
            return <Icons.BsVolumeDown />
        }
        if (currentVolume <= 0) {
            return <Icons.BsVolumeMute />
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
        GetVolumeIcons()
    }, [currentVolume])

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
        setplayerState({ ...playerState, [id]: !state })
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
                                            <div className="tack_card-playlist--top-bar text-left">
                                                <button
                                                    onClick={() => { dispatch(clearPlayList()) }}
                                                    className="btn closeBtn">
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
                                                                <img onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null;
                                                                    currentTarget.src = Icons.defualtImage;
                                                                }}
                                                                    onClick={() => handleClick(item.id)}
                                                                    className="img-fluid current-songlist-card-img " src={item?.image[0].link} alt="album-art" />
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
                                            <div className="tack_card-details-albumart text-center">
                                                <img onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = Icons.defualtImage;
                                                }}
                                                    src={currentNewSong?.image[currentNewSong?.image.length - 1]?.link}
                                                    alt={currentNewSong?.image[currentNewSong?.image.length - 1]?.quality}
                                                    className="img-fluid"
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
                                                    {<GetVolumeIcons />}
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
                                                onClick={() => { handlePlayerState(Constants.isFavourite, playerState.isFavourite) }}
                                                className="btn">
                                                {playerState.isFavourite ? <Icons.BsHeartFill color='#ff0000' /> : <Icons.BsHeart />}
                                            </button>
                                            {currentNewSong.hasLyrics === 'true' ? <div onClick={() => {
                                                setShowLyrics({ ...ShowLyrics, state: !ShowLyrics.state })
                                            }} className="btn lyrics">
                                                <p className="text-headeing">
                                                    <span className="pb-2">{ShowLyrics.state ? <Icons.BsChevronDoubleDown /> : <Icons.BsChevronDoubleUp />}</span> Lyrics
                                                </p>
                                            </div> :
                                                <div className="btn dummy px-5"></div>
                                            }
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
                                                !isNaN(duration) ?
                                                    getCorrectTimeForamt(duration) : "--:--"
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
                                            <img onError={({ currentTarget }) => {
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
        </>
    );
};

export default GlobalPlayer;
