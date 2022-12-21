import React from 'react'
import './style.scss'
import { Icons } from '../../assets/Icons'
// import SkipBack from "../../assets/Icons/skip-back.svg";
const GlobalPlayer = () => {
    return (
        <>
            <div className=" container mini_player">
                <div className="col-2 image">
                    <img src='https://cdn.pixabay.com/photo/2017/08/23/11/45/cassette-2672633_960_720.png'
                        alt="album art" className="img-fluid albumart" />
                </div>
                <div className="col-6  info">
                    <h5 className=" trackName ">new Song</h5>
                    <p className=" artists">imran, hussian, Pasha</p>
                </div>
                <div className="col-4  controls">
                    <button className="round-btn btn-prev">
                        <img src={Icons.SkipBack} alt="skip back" className="img-fluid" />
                    </button>
                    <button className="round-btn btn-play">
                        <img src={Icons.PlayCircle} alt="play/pause" className="img-fluid" />
                    </button>
                    <button className="round-btn btn-next">
                        <img src={Icons.SkipForward} alt="forward" className="img-fluid" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default GlobalPlayer