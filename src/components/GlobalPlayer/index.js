import React, { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { currentPlaylist, currentTrack, removeTrackFromPlayList, setLocalPlayListData, setNextTrack } from "../../Redux/Reducers/PlayList-slice";
import { Icons } from "../../assets/Icons";
import { ConsoleStyle, ParseString } from "../../utils";
import RouteStrings from "../../utils/RouteStrings";
import SpotLoader from "../Loader/SpotLoader";
import "../SeekBar/style.scss";
import "./style.scss";
import PlayingAnime from "../Loader/PlayingAnime";
import { getRequest } from "../../apis/Base/serviceMethods";
import { configURL } from "../../apis/Base/config";


const GlobalPlayer = () => {
    const Constants = {
        isPlaying: 'isPlaying',
        isMute: 'isMute',
        isFavourite: 'isFavourite',
        isPrevious: 'isPrevious',
        isNext: 'isNext',
    }


    const audioRef = useRef();
    const progressBarRef = useRef();
    const animationRef = useRef();
    const dispatch = useDispatch()
    const trackList = useSelector(currentPlaylist)
    const currenttrackDetails = useSelector(currentTrack);
    const navigate = useNavigate();
    const [trackData, settrackData] = useState({})
    const [trackDataList, settrackDataList] = useState([])
    const [totalDuration, settotalDuration] = useState('0:00')
    const [currentDuration, setcurrentDuration] = useState('0')

    const [isMegaPlayerON, setisMegaPlayerON] = useState(false);
    const [isLoopOn, setisLoopOn] = useState(false);
    const [ShowLyrics, setShowLyrics] = useState({
        state: false,
        data: {}
    });
    const [isTrackLoading, setisTrackLoading] = useState(false)
    const [OpenPlaylist, setOpenPlaylist] = useState(false);
    const [playerState, setplayerState] = useState({
        isPlaying: false,
        isMute: false,
        isFavourite: false,
    })
    useEffect(() => {
        settrackDataList(trackList)
    }, [trackList])

    useEffect(() => {
        LoadTrackandPlay()
        getSongLyrics()
    }, [currenttrackDetails.songIndex])
    const getSongLyrics = async () => {
        if (currenttrackDetails.data.hasLyrics === "true") {
            await getRequest(configURL.lyrics + currenttrackDetails.data.id).then(res => {
                setShowLyrics({ ...ShowLyrics, data: res.data.data })
            }).catch(err => {
                toast.error("somting went wrong ")
            })
        }
    }
    const DummyFn = () => {
        console.log("CAN PLAY TRACK");
    }
    const LoadTrackandPlay = () => {
        settrackData(currenttrackDetails.data)
        audioRef?.current?.load()
        setisTrackLoading(false)
        playTrack()
    }
    useEffect(() => {
        whilePlaying()
    }, [isMegaPlayerON == true])

    useEffect(() => {
        settotalDuration(audioRef?.current?.duration)
        const Sec = Math.floor(audioRef?.current?.duration)
        if (progressBarRef?.current?.max) {
            progressBarRef.current.max = Sec
        }
        whilePlaying()
    }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);


    const getCorrectTimeForamt = (sec) => {
        const Trackduration = sec
        const minitue = Math.floor(Trackduration / 60);
        const secound = Math.floor(Trackduration % 60);
        const newDuration = (minitue < 10 ? `0${minitue}` : minitue) + ":" + (secound < 10 ? `0${secound}` : secound)
        return newDuration
    }

    const handleRangeChange = () => {
        if (audioRef?.current?.currentTime) {
            audioRef.current.currentTime = progressBarRef?.current?.value;
            updatePalyeTime()
        }
    }
    const updatePalyeTime = () => {
        setcurrentDuration(progressBarRef?.current?.value)
        progressBarRef.current?.style.setProperty('--seek-before-width', `${progressBarRef.current.value / totalDuration * 100}%`)
    }
    const whilePlaying = () => {
        if (progressBarRef?.current?.value) {
            progressBarRef.current.value = audioRef.current.currentTime;
            updatePalyeTime()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        if (audioRef?.current?.ended) {
            cancelAnimationFrame(animationRef?.current)
            setplayerState({ ...playerState, isPlaying: false })
            // resetToZero()
            playNextTrack()
        }
    }
    const playNextTrack = () => {
        pauseTrack();
        if (trackDataList.length > 1) {
            dispatch(setNextTrack({ songIndex: currenttrackDetails.songIndex + 1, data: trackDataList[currenttrackDetails.songIndex + 1] }))
        }
        if (trackDataList.length - 1 === currenttrackDetails.songIndex) {
            dispatch(setNextTrack({ songIndex: 0, data: trackDataList[0] }))
        }
    }
    const playPreviousTrack = () => {
        if (trackData.songIndex > 1) {
            pauseTrack();
            dispatch(setNextTrack({ songIndex: trackData.songIndex - 1, data: trackDataList[trackData.songIndex - 1] }))
            // audioRef.current.src = trackData.downloadUrl[trackData[currentTrackIndex + 1].length - 1];
            // audioRef.current.load();
            // playTrack()
        } else {
            dispatch(setNextTrack({ songIndex: 0, data: trackDataList[0] }))

        }
    }
    const handlePlayerState = (id, state, data = {}) => {
        setplayerState({ ...playerState, [id]: !state })
        switch (id) {
            case Constants.isMute:
                audioRef.current.muted = !state
                break;
            default:
                break;
        }
    }
    const handleClick = () => {
        const prevState = isMegaPlayerON
        setisMegaPlayerON(!prevState);
    };
    const handleNaviagteToAblum = (id) => {
        navigate(RouteStrings.albums + id);
    };
    const pauseTrack = () => {
        const prevState = playerState.isPlaying;
        setplayerState({ ...playerState, isPlaying: false })
        audioRef.current.pause()
    }
    const playTrack = () => {
        const prevState = playerState.isPlaying
        setplayerState({ ...playerState, isPlaying: true })
        audioRef?.current?.play()
        animationRef.current = requestAnimationFrame(whilePlaying)
        setisTrackLoading(false)
    }
    const handlePlayControls = (id) => {
        const prevState = playerState.isPlaying
        switch (id) {
            case Constants.isPlaying:
                if (!prevState) {
                    playTrack()
                } else {
                    pauseTrack()
                }
                break;
            case Constants.isPrevious:
                playPreviousTrack()
                break;
            case Constants.isNext:
                playNextTrack()

                break;
            default:
                break;
        }
    }
    const togglePlayList = () => {
        setOpenPlaylist(!OpenPlaylist)
    }
    const handlePlayPlalistSong = (songData) => {
        dispatch(setLocalPlayListData(songData))
        togglePlayList()
    }
    const handleremoveTrack = (id) => {
        if (trackData.id === id) {
            toast("cannot remove playing track")
        }
        else {
            dispatch(removeTrackFromPlayList(id))
        }
    }

    return (
        <>
            {trackData.id ?
                <>
                    <audio
                        autoPlay
                        loop={isLoopOn}
                        ref={audioRef}
                        src={trackData?.downloadUrl[trackData?.downloadUrl?.length - 1]?.link}
                        type="audio/mp4"
                        preload="metadata"
                        controls
                        className="track-audio"
                    />
                    <div
                        style={
                            {
                                background:
                                    `linear-gradient(rgb(30,30,30,0.8), rgb(30,30,30,1)), url(${trackData?.image[2]?.link}) center/cover no-repeat `,
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
                                            <button onClick={() => { togglePlayList() }} className="tack_card-topBar--icon">
                                                <Icons.SlPlaylist color="#ffffff" />
                                            </button>
                                        </div>
                                        <div className={`tack_card-playlist ${OpenPlaylist ? "active" : ''}`}>
                                            <div className="tack_card-playlist--top-bar text-left">
                                                <button onClick={() => { togglePlayList() }} className="btn">
                                                    <Icons.AiOutlineCloseCircle />
                                                </button>
                                            </div>
                                            <div className="current-songlist">
                                                {trackDataList?.map(item => {
                                                    return (
                                                        <>
                                                            <div id={item?.id}
                                                                key={item?.id}
                                                                className={`current-songlist-card ${(trackData.id === item.id) && 'current-palying'}`}
                                                            >

                                                                <img onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null;
                                                                    currentTarget.src = Icons.defualtImage;
                                                                }} onClick={() => handleClick(item.id)} className="img-fluid current-songlist-card-img " src={item?.image[0].link} alt="album-art" />
                                                                <div onClick={() => handleClick(item.id)} className="current-songlist-card-info">
                                                                    <p className="current-songlist-card-info-songName"> {ParseString(item.name)}</p>
                                                                    <p className="current-songlist-card-info-artistName">{ParseString(item?.primaryArtists)}</p>
                                                                </div>
                                                                <div className="current-songlist-card-controls">
                                                                    {trackData.id === item.id ? <PlayingAnime /> : <button
                                                                        onClick={() => handlePlayPlalistSong(item)}
                                                                        className='btn current-songlist-card-controls-btn '>
                                                                        <Icons.BsPlayFill />
                                                                    </button>}

                                                                    <button onClick={() => handleremoveTrack(item.id)} className='btn current-songlist-card-controls-btn'>
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
                                                    src={trackData?.image[trackData?.image.length - 1]?.link}
                                                    alt={trackData?.image[trackData?.image.length - 1]?.quality}
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="tack_card-details-info  text-center">
                                                <h4 className="tack-name text-center text-truncate ">{ParseString(trackData?.name)}</h4>
                                                <h5
                                                    className="tack-album-name text-center text-underline  text-truncate "
                                                    onClick={() => {
                                                        setisMegaPlayerON(!isMegaPlayerON);
                                                        handleNaviagteToAblum(trackData?.album?.id);
                                                    }}
                                                >
                                                    Album <span>
                                                        <Icons.BsHeadphones />&nbsp;{trackData?.playCount}
                                                    </span>
                                                </h5>
                                                <h5
                                                    className="tack-album-name text-center text-underline  text-truncate "
                                                // onClick={() => {
                                                //     setisMegaPlayerON(!isMegaPlayerON);
                                                //     handleNaviagteToAblum(trackData?.album?.id);
                                                // }}
                                                >
                                                    {ParseString(trackData?.primaryArtists)}
                                                </h5>

                                            </div>
                                            <div className={`tack_card-details-textTrack ${ShowLyrics.state && 'track-active'} text-center`}>
                                                <h4 className="tack_card-details-textTrack-lyrics">{ShowLyrics.data?.lyrics}</h4>
                                                <p className="text-muted">{ShowLyrics.data?.copyright}</p>
                                            </div>
                                        </div>
                                        <div className="tack_card-media-icons">
                                            <button onClick={() => { handlePlayerState(Constants.isMute, playerState.isMute) }} className="btn">
                                                {
                                                    playerState.isMute ?
                                                        <Icons.BsVolumeMute />
                                                        :
                                                        <Icons.BsVolumeUp />}
                                            </button>
                                            <button onClick={() => { handlePlayerState(Constants.isFavourite, playerState.isFavourite) }} className="btn">
                                                {playerState.isFavourite ? <Icons.BsHeartFill color='#ff0000' /> : <Icons.BsHeart />}
                                            </button>
                                            {trackData.hasLyrics === 'true' ? <div onClick={() => {
                                                setShowLyrics({ ...ShowLyrics, state: !ShowLyrics.state })
                                            }} className="btn lyrics">
                                                {/* <Icons.BsChevronDoubleDown /> */}
                                                <p className="text-headeing">
                                                    Lyrics
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
                                                !isNaN(currentDuration) ?
                                                    getCorrectTimeForamt(currentDuration) : "--:--"
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
                                        <button onClick={() => { handlePlayControls(Constants.isPrevious) }} className="btn">
                                            <Icons.BsChevronBarLeft />
                                        </button>
                                        {isTrackLoading ?
                                            <SpotLoader />
                                            : <button onClick={() => { handlePlayControls(Constants.isPlaying) }} className="btn">
                                                {playerState.isPlaying ?
                                                    <Icons.BsPauseFill />
                                                    : <Icons.BsPlayFill />}
                                            </button>}
                                        <button onClick={() => { handlePlayControls(Constants.isNext) }} className="btn">
                                            <Icons.BsChevronBarRight />
                                        </button>
                                    </div>
                                </> : <>
                                    <div className="miniplayer-wrapper">
                                        <div onClick={handleClick} className="col-2 image">
                                            <img onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = Icons.defualtImage;
                                            }}
                                                src={trackData?.image[0]?.link}
                                                alt={trackData?.image[0]?.quality}
                                                className="img-fluid albumart"
                                            />
                                        </div>
                                        <div onClick={handleClick} className="col-6 text-truncate  info">
                                            <h5 className=" trackName text-trucate ">{ParseString(trackData?.name)}</h5>
                                            <p className=" artists text-trucate"> {ParseString(trackData?.primaryArtists)}</p>
                                        </div>
                                        <div className="col-4  controls">
                                            <button onClick={() => { handlePlayControls(Constants.isPrevious) }} className="btn">
                                                <Icons.BsChevronBarLeft />
                                            </button>
                                            <button onClick={() => { handlePlayControls(Constants.isPlaying) }} className="btn">
                                                {playerState.isPlaying ? <Icons.BsPauseFill /> : <Icons.BsPlayFill />}
                                            </button>
                                            <button onClick={() => { handlePlayControls(Constants.isNext) }} className="btn">
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
                reverseOrder={true}
            />
        </>
    );
};

export default GlobalPlayer;
