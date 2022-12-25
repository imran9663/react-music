import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { currentPlaylist, currentTrack, setNextTrack } from "../../Redux/Reducers/PlayList-slice";
import { Icons } from "../../assets/Icons";
import { ParseString } from "../../utils";
import RouteStrings from "../../utils/RouteStrings";
import "../SeekBar/style.scss";
import "./style.scss";


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
    const [currentTrackIndex, setcurrentTrackIndex] = useState(0);
    const [totalDuration, settotalDuration] = useState('0:00')
    const [currentDuration, setcurrentDuration] = useState('0')
    const [isMegaPlayerON, setisMegaPlayerON] = useState(false);
    const [playerState, setplayerState] = useState({
        isPlaying: false,
        isMute: false,
        isFavourite: false,
    })
    useEffect(() => {
        settrackDataList(trackList)
    }, [])
    useEffect(() => {
        // if (currenttrackDetails.data && audioRef?.current?.src) {
        //     console.log("<==songIndex CHANGE ==> ");
        settrackData(currenttrackDetails.data)
        //     audioRef.current.src = currenttrackDetails.data.downloadUrl[currenttrackDetails.data.length - 1];
        //     audioRef.current.load();
        //     playTrack()
        // }
    }, [currenttrackDetails.songIndex])

    useEffect(() => {
        settotalDuration(audioRef?.current?.duration)
        const Sec = Math.floor(audioRef?.current?.duration)
        if (progressBarRef?.current?.max) {
            progressBarRef.current.max = Sec
        }
        // console.log("audioRef?.current?.onplay0", audioRef?.current?.onplay);
        // if (audioRef?.current?.onplay) {
        //     // alert("started playeing")
        //     const prevState = playerState.isPlaying
        //     setplayerState({ ...playerState, isPlaying: !prevState })
        // }
        updatePalyeTime()
    }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState, isMegaPlayerON]);


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
            // setcurrentTrackIndex(1)
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
    // const tracks = useSelector(currentPlaylist);
    const handleClick = () => {
        const prevState = isMegaPlayerON
        setisMegaPlayerON(!prevState);

    };
    const handleNaviagteToAblum = (id) => {
        navigate(RouteStrings.albums + id);
    };
    const pauseTrack = () => {
        const prevState = playerState.isPlaying;
        setplayerState({ ...playerState, isPlaying: !prevState })
        audioRef.current.pause()
        cancelAnimationFrame(animationRef?.current)
    }
    const playTrack = () => {
        const prevState = playerState.isPlaying
        setplayerState({ ...playerState, isPlaying: !prevState })
        audioRef.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying)
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
                console.log("Previous btn clicked ⏮");
                playPreviousTrack()
                break;
            case Constants.isNext:
                playNextTrack()
                console.log("Next btn clicked ⏭");
                // audio.addEventListener('ended', function () {
                //     audio.src = "new url";
                //     audio.pause();
                //     audio.load();
                //     audio.play();
                // });

                break;
            default:
                break;
        }
    }
    return (
        <>
            {trackData.id ?
                <><audio
                    ref={audioRef}
                    src={trackData?.downloadUrl[trackData?.downloadUrl.length - 1]?.link}
                    type="audio/mp4"
                    preload="metadata"
                    controls
                    className="track-audio"
                />

                    <div
                        style={
                            isMegaPlayerON
                                ? {
                                    background: `linear-gradient(rgb(30,30,30,0.6), rgb(30,30,30,1)), url(${trackData?.image[2]?.link})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }
                                : { background: "#1e1e1e" }
                        }
                        className={`player ${isMegaPlayerON ? "mega" : "mini "}`}
                    >

                        {/* <audio src={trackData?.downloadUrl[4]?.link} controls></audio> */}
                        {isMegaPlayerON ? (
                            <>
                                <div className="tack_card pt-1">
                                    <div className="tack_card-topBar">
                                        <button
                                            onClick={handleClick}
                                            className="tack_card-topBar--icon-down"
                                        >
                                            <Icons.BsChevronDoubleDown />
                                        </button>
                                        <div className="tack_card-topBar--space">
                                            <div className="text-center text-white text-capital">
                                                react-music
                                            </div>
                                        </div>
                                        <button className="tack_card-topBar--icon">
                                            <Icons.SlPlaylist color="#ffffff" />
                                        </button>
                                    </div>

                                    <div className="tack_card-albumart">
                                        <img
                                            src={trackData?.image[trackData?.image.length - 1]?.link}
                                            alt={trackData?.image[trackData?.image.length - 1]?.quality}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="tack_card-info">
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
                                            {trackData?.primaryArtists}
                                        </h5>

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
                                        <div className="btn dummy"></div>
                                        <div className="btn dummy"></div>
                                        <div className="btn dummy"></div>
                                        <button className="btn">
                                            <Icons.BsArrowRepeat />
                                        </button>
                                        <button className="btn">
                                            <Icons.BsShuffle />
                                        </button>
                                    </div>
                                    <div className="tack_card-timeLine">
                                        <div className="timings">
                                            <p className="time">{getCorrectTimeForamt(currentDuration)}</p>
                                            <p className="time">{getCorrectTimeForamt(totalDuration)}</p>
                                        </div>
                                        <div className="seekbar-wrapper">
                                            <input ref={progressBarRef}
                                                onChange={handleRangeChange}
                                                type='range'
                                                max={0}
                                                value={currentDuration}
                                                className="seekBar" />
                                        </div>
                                    </div>
                                    <div className="tack_card-controls">
                                        <button onClick={() => { handlePlayControls(Constants.isPrevious) }} className="btn">
                                            <Icons.BsChevronBarLeft />
                                        </button>
                                        <button onClick={() => { handlePlayControls(Constants.isPlaying) }} className="btn">
                                            {playerState.isPlaying ?
                                                <Icons.BsPauseFill />
                                                : <Icons.BsPlayFill />}
                                        </button>
                                        <button onClick={() => { handlePlayControls(Constants.isNext) }} className="btn">
                                            <Icons.BsChevronBarRight />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div onClick={handleClick} className="col-2 image">
                                    <img
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
                            </>
                        )}
                    </div></>
                : <><h1 className="text-center text-light">LOADING</h1></>}
        </>
    );
};

export default GlobalPlayer;
