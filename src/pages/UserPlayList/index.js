import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Topbar from '../../components/Topbar';
import './style.scss'
import { Icons } from '../../assets/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { allUserPlaylists, setLocalPlayListData } from '../../Redux/Reducers/PlayList-slice';
import SongStrip from '../../components/SongStrip';
import { loaclStorageStrings } from '../../utils/localStorageStrings';
import { postRequestWithInstence } from '../../apis/Base/serviceMethods';
import { configURL } from '../../apis/Base/config';
import toast from 'react-hot-toast';
import RouteStrings from '../../utils/RouteStrings';
import * as _ from 'loadsh';
const UserPlayList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const allPlaylists = useSelector(allUserPlaylists);
    const [newPlayList] = useState(allPlaylists.playlists.filter((list) => { return list.playlistId === id }))

    const [playListData, setplayListData] = useState(_.get(newPlayList, `[0].playListData`, []));

    const profileInfo = JSON.parse(localStorage.getItem(loaclStorageStrings.profileInfo))

    const getImageURL = (index) => _.get(newPlayList, `[0].playListData[${index}].image[0].link`, Icons.defualtImage)
    const dispatch = useDispatch();

    const handleRemovePlayList = () => {
        const payload = {
            userId: profileInfo?._id,
            playlistId: id,
        }
        callRemovePlaylistApi(payload)
    }
    const callRemovePlaylistApi = async (payload) => {
        await postRequestWithInstence(configURL.deletePlayListByPlayListId, payload).then((result) => {
            if (result.status === 200) {
                navigate(RouteStrings.home);
            }
        }).catch((err) => {
            toast.error("Delete failed")
        });
    }
    const callRemoveTrackFromAPi = async (payload) => {
        await postRequestWithInstence(configURL.removeTrackFromPlaylistByTrackId, payload).then((result) => {
            if (result.status === 200) {
                setplayListData(() => playListData.filter((track) => track.id !== payload.trackId))
            }
        }).catch((err) => {
            console.log("callRemoveTrackFromAPi err", err);
            toast.error('failed to Remove Song')
        });
    }
    const handleRemoveTrackFromPlayList = (trackId) => {
        const payload = {
            userId: profileInfo?._id,
            playlistId: id,
            trackId: trackId
        }
        callRemoveTrackFromAPi(payload)

    }
    const playAllSongsInPlayList = () => {
        dispatch(setLocalPlayListData(playListData))
    }
    return (
        <>
            <div className="userPlaylist-container">
                <Topbar tbClassName={'tbar'} />
                <div className="userPlaylist-container-infoBody">
                    <div className="userPlaylist-container-infoBody-item px-2">
                        <div className="image-wrapper">
                            <img src={getImageURL(0)}
                                alt=""
                                className="image-wrapper_image" />
                            <img src={getImageURL(1)}
                                alt=""
                                className="image-wrapper_image" />
                            <img src={getImageURL(2)}
                                alt=""
                                className="image-wrapper_image" />
                            <img src={getImageURL(3)}
                                alt=""
                                className="image-wrapper_image" />
                        </div>

                        <div className="playlist-info-wrapper">
                            <div className="playlistInfo">
                                <p className="playlistName">
                                    {_.get(newPlayList, `[0].playListData.playListName`, '')}
                                </p>
                                <div className="d-flex flex-row">
                                    {/* <p className="creator ">
                                        @imran
                                    </p> */}
                                    <p className="tracks text-light">
                                        <span>
                                            <Icons.BsMusicNote />
                                            {_.size(_.get(newPlayList, `[0].playListData`, []))}
                                        </span>
                                    </p>
                                </div>

                            </div>
                            <div className="playlist-action ">
                                <button className='btn playlist-round-btn'>
                                    <Icons.BsShare className='icon' />
                                </button>
                                <button onClick={playAllSongsInPlayList} className='btn playlist-round-btn'>
                                    <Icons.BsListPlay />
                                </button>
                                <button onClick={handleRemovePlayList} className='btn playlist-round-btn'>
                                    <Icons.BsTrashCan />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="userPlaylist-container-trackList px-2">

                    <div className="songStripWrapper">
                        {playListData.length > 0 ?
                            playListData.map((track, index) => <SongStrip data={track} key={index} showRemoveFromPlaylist={true} handleRemoveTrackFromPlayList={handleRemoveTrackFromPlayList} />)
                            :
                            <div className="container d-flex flex-column justify-content-center gap-3 align-items-center ">
                                <Icons.BsNoMusic fill="#e3e3e3" style={{ width: "7rem" }} />
                                <p className="text-white">No Data Found</p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPlayList