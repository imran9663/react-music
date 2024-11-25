import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Topbar from '../../components/Topbar';
import './style.scss'
import { Icons } from '../../assets/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { allUserPlaylists, setLocalPlayListData } from '../../Redux/Reducers/PlayList-slice';
import SongStrip from '../../components/SongStrip';
import { loaclStorageStrings } from '../../utils/localStorageStrings';
import { getRequestWithInstence, postRequestWithInstence } from '../../apis/Base/serviceMethods';
import { configURL } from '../../apis/Base/config';
import toast from 'react-hot-toast';
import RouteStrings from '../../utils/RouteStrings';
import * as _ from 'loadsh';
import BannerLoader from '../../components/Loader/BannerLoader';
const UserPlayList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const allPlaylists = useSelector(allUserPlaylists);
    const [newPlayList, setNewPlayList] = useState([]);
    const [isPlayListLoading, setIsPlayListLoading] = useState(false);
    const [playListData, setplayListData] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState({})
    const [isPlaylistCreator, setIsPlaylistCreator] = useState(false);

    const profileInfo = JSON.parse(localStorage.getItem(loaclStorageStrings.profileInfo))

    useEffect(() => {
        if (allPlaylists.length > 0) {
            setNewPlayList(allPlaylists?.playlists?.filter((list) => { return list.playlistId === id }))
        } else {

            callGetPlayListsByPlayListId()
        }
    }, [])




    const callGetPlayListsByPlayListId = async () => {
        setIsPlayListLoading(true);
        await getRequestWithInstence(configURL.getPlayListsByPlayListId + id).then((result) => {
            const { userId, createdAt, createdBy } = result.data.data
            setPlaylistInfo({ userId, createdAt, createdBy });
            setNewPlayList(result.data.data.playlists)
            setIsPlaylistCreator(profileInfo._id === userId)
        }).catch((err) => {
            toast.error('Something went Wrong')
        }).finally(() => {
            setIsPlayListLoading(false)
        })
    }



    useEffect(() => {
        setplayListData(_.get(newPlayList, `[0].playListData`, []))
    }, [newPlayList])
    const getImageURL = (index) => _.get(newPlayList, `[0].playListData[${index}].image[0].link`, Icons.defualtImage)
    const dispatch = useDispatch();

    const handleRemovePlayList = () => {
        const payload = {
            userId: profileInfo?._id,
            playlistId: id,
        }
        callRemovePlaylistApi(payload)
    }
    const handleFullPlayList = () => {
        // code to add entire playlist 
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
    const handleSharePlayList = async () => {
        try {
            navigator.clipboard.writeText(window.location.href)
        } catch (error) {
            toast.error('Failed to copy URL')
        }
    }
    return (
        <>
            <div className="userPlaylist-container">
                <Topbar tbClassName={'tbar'} />
                {isPlayListLoading ? <BannerLoader /> : <>
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
                                        {_.get(newPlayList, `[0].playListName`, '')}
                                    </p>
                                    <div className=" mr-2 d-flex flex-row justify-content-between ">
                                        <p className="creator ">
                                            {playlistInfo?.createdBy}
                                        </p>
                                        <p className="tracks text-light">
                                            <span className='music-note' >
                                                <Icons.BsMusicNote />
                                                {_.size(_.get(newPlayList, `[0].playListData`, []))}
                                            </span>
                                        </p>

                                    </div>

                                </div>
                                <div className="playlist-action ">
                                    <button onClick={handleSharePlayList} className='btn playlist-round-btn'>
                                        <Icons.BsShare className='icon' />
                                    </button>
                                    <button onClick={playAllSongsInPlayList} className='btn playlist-round-btn'>
                                        <Icons.BsListPlay />
                                    </button>
                                    {isPlaylistCreator && <button onClick={handleRemovePlayList} className='btn playlist-round-btn'>
                                        <Icons.BsTrashCan />
                                    </button>}
                                    {!isPlaylistCreator && <button onClick={handleFullPlayList} className='btn playlist-round-btn'>
                                        <Icons.BsListPlus />
                                    </button>}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="userPlaylist-container-trackList px-2">

                        <div className="songStripWrapper">
                            {playListData.length > 0 ?
                                playListData.map((track, index) => <SongStrip data={track} key={index} showRemoveFromPlaylist={isPlaylistCreator} handleRemoveTrackFromPlayList={handleRemoveTrackFromPlayList} />)
                                :
                                <div className="container d-flex flex-column justify-content-center gap-3 align-items-center ">
                                    <Icons.BsNoMusic fill="#e3e3e3" style={{ width: "7rem" }} />
                                    <p className="text-white">No Data Found</p>
                                </div>
                            }

                        </div>
                    </div>
                </>}

            </div>
        </>
    )
}

export default UserPlayList