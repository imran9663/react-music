import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Icons } from "../../assets/Icons";
import RouteStrings from "../../utils/RouteStrings";
import trackData from "../../utils/data/data.json";
import SeekBar from "../SeekBar";
import "./style.scss";
import "../SeekBar/style.scss";

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
    const navigate = useNavigate();
    const [toatlDuration, settotalDuration] = useState('0:00')
    const [currentDuration, setcurrentDuration] = useState('0:00')
    const [playerState, setplayerState] = useState({
        isPlaying: false,
        isMute: false,
        isFavourite: false,
    })
    useEffect(() => {
        settotalDuration(getCorrectTimeForamt(audioRef?.current?.duration))
        progressBarRef.current.max = Math.floor(audioRef?.current?.duration)
    }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

    const getCorrectTimeForamt = (sec) => {
        const Trackduration = sec
        const minitue = Math.floor(Trackduration / 60);
        const secound = Math.floor(Trackduration % 60);
        const newDuration = (minitue < 10 ? `0${minitue}` : minitue) + ":" + (secound < 10 ? `0${secound}` : secound)
        return newDuration
    }
    const getCurrentDuration = () => {
        const currenttime = audioRef.current.currentTime
        // set
    }
    const handleRangeChange = () => {

    }
    const handlePlayerState = (id, state, data = {}) => {
        setplayerState({ ...playerState, [id]: !state })
    }
    const [isMegaPlayerON, setisMegaPlayerON] = useState(false);
    // const tracks = useSelector(currentPlaylist);
    const handleClick = () => {
        setisMegaPlayerON(!isMegaPlayerON);
    };
    const handleNaviagteToAblum = (id) => {
        navigate(RouteStrings.albums + id);
    };
    const handlePlayControls = (id) => {
        const prevState = playerState.isPlaying
        switch (id) {
            case Constants.isPlaying:
                if (!prevState) {
                    setplayerState({ ...playerState, isPlaying: !prevState })
                    audioRef.current.play()
                } else {
                    setplayerState({ ...playerState, isPlaying: !prevState })
                    audioRef.current.pause()
                }
                break;
            case Constants.isPrevious:
                console.log("Previous btn clicked ⏮");
                break;
            case Constants.isNext:
                console.log("Next btn clicked ⏭");
                break;
            default:
                break;
        }
    }
    const Imgurl = trackData[0].image[2].link;
    return (
        <>
            <div
                style={
                    isMegaPlayerON
                        ? {
                            background: `linear-gradient(rgb(30,30,30,0.6), rgb(30,30,30,1)), url(${Imgurl})`,
                        }
                        : { background: "#1e1e1e" }
                }
                className={`player ${isMegaPlayerON ? "mega" : "mini"}`}
            >
                <audio
                    ref={audioRef}
                    src={trackData[0].downloadUrl[4].link}
                    type="audio/mp4"
                    preload="metadata"
                    controls
                    className="track-audio"
                />
                {/* <audio src={trackData[0].downloadUrl[4].link} controls></audio> */}
                {isMegaPlayerON ? (
                    <>
                        <div className="tack_card pt-1">
                            <div className="tack_card-topBar">
                                <button
                                    onClick={handleClick}
                                    className="tack_card-topBar--icon-down"
                                >
                                    <Icons.BsChevronDoubleDown color="#ffffff" />
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
                                    src={trackData[0].image[2].link}
                                    alt={trackData[0].image[2].quality}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="tack_card-info">
                                <h4 className="tack-name text-truncate ">{trackData[0].name}</h4>
                                <h5
                                    className="tack-album-name text-center text-underline  text-truncate "
                                    onClick={() => {
                                        setisMegaPlayerON(!isMegaPlayerON);
                                        handleNaviagteToAblum(trackData[0]?.album?.id);
                                    }}
                                >
                                    Album <span>
                                        <Icons.BsHeadphones />&nbsp;{trackData[0].playCount}
                                    </span>
                                </h5>
                                <h5
                                    className="tack-album-name text-underline  text-truncate "
                                // onClick={() => {
                                //     setisMegaPlayerON(!isMegaPlayerON);
                                //     handleNaviagteToAblum(trackData[0]?.album?.id);
                                // }}
                                >
                                    {trackData[0].primaryArtists}
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
                                    <p className="time">{currentDuration}</p>
                                    <p className="time">{toatlDuration}</p>
                                </div>
                                <div className="seekbar-wrapper">
                                    <input ref={progressBarRef}
                                        onChange={handleRangeChange}
                                        type='range'
                                        defaultValue={0}
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
                                src={trackData[0].image[0].link}
                                alt={trackData[0].image[0].quality}
                                className="img-fluid albumart"
                            />
                        </div>
                        <div onClick={handleClick} className="col-6 text-truncate  info">
                            <h5 className=" trackName text-trucate ">{trackData[0].name}</h5>
                            <p className=" artists text-trucate"> {trackData[0].primaryArtists}</p>
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
            </div>
        </>
    );
};

export default GlobalPlayer;
