import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './style.scss'
import { Icons } from '../../assets/Icons';
import { formatDate, getRandomGradients } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { allUserPlaylists, setAllUserPlaylists } from '../../Redux/Reducers/PlayList-slice';
import PlayListCard from '../PlayListCard';
import { loaclStorageStrings } from '../../utils/localStorageStrings';
import { getRequestWithInstence, postRequestWithInstence } from '../../apis/Base/serviceMethods';
import { configURL } from '../../apis/Base/config';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
function AddToPlayListModal ({ showAddToModal, handleHideModal, songData }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const allUserPlaylistsData = useSelector(allUserPlaylists);
    useEffect(() => {
    }, []);
    const [newPlaylistName, setNewPlaylistName] = useState('')
    const handleNewPlayListName = (e) => {
        const { id, value } = e.target
        setNewPlaylistName(value)
    }
    const profileInfo = JSON.parse(localStorage.getItem(loaclStorageStrings.profileInfo))
    const handleCreatePlayList = () => {
        const obj = {
            userId: profileInfo._id,
            createdBy: profileInfo.fullName,
            playListName: newPlaylistName,
            playListData: [songData]
        }
        callCreatePlaylistApi(obj)
        getAllPlayLists(profileInfo._id)

    }
    const handleAddToSelectedPlaylist = (id) => {
        const payload = {
            userId: profileInfo._id,
            playlistId: id,
            trackData: songData
        }
        callAddTrackToPlaylistApi(payload);
        getAllPlayLists(profileInfo._id)

    }
    const getAllPlayLists = async (userId) => {
        await getRequestWithInstence(`${configURL.getAllPlayListsByUser}/${userId}`)
            .then((result) => {
                if (result.status === 200) {
                    dispatch(setAllUserPlaylists(result?.data?.data))
                }
            })
            .catch((err) => {
                console.log("getAllPlayLists error ==>", err);
                toast.error("❌ error in fetching User Playlist");
            });
    };
    const callCreatePlaylistApi = async (data) => {
        await postRequestWithInstence(configURL.createPlayListByUser, data).then((result) => {
            toast.success('Playlist Created');
            handleHideModal();
            navigate(-1)
        }).catch((err) => {
            console.log("callCreatePlaylistApi error=>", err);
            toast.error('unable to create Playlist')
        });
    }
    const callAddTrackToPlaylistApi = async (data) => {
        await postRequestWithInstence(configURL.addTrackToThePlayListById, data).then((result) => {
            toast.success('Track Added');
            handleHideModal();
            navigate(-1)
        }).catch((err) => {
            console.log("callAddTrackToPlaylistApi error=>", err);
            toast.error('unable to add Track')
        });
    }
    return (
        <>
            <Modal className='mainModal' style={{ background: 'transparent' }} show={showAddToModal} centered onHide={handleHideModal}>
                <div className="newPlaylist-container mx-3">
                    <div className="modalHeader">
                        <div className="modalName">Add To Play List</div>
                        <button onClick={handleHideModal} className="btn closeBtn">
                            <Icons.AiOutlineCloseCircle />
                        </button>
                    </div>
                    <div className="newPlaylist-wrapper">
                        <div className="ipGrp">
                            <input type="text"
                                placeholder='My Playlist'
                                className="form__field"
                                value={newPlaylistName}
                                onChange={handleNewPlayListName}
                            />
                        </div>
                        <button disabled={newPlaylistName === ''} onClick={handleCreatePlayList} className="btn  playlist-round-btn">
                            <Icons.BsPlusCircle />
                        </button>
                    </div>
                    <div className="existingPlayList-wrapper">
                        <h2 className="modalName">My Lists </h2>
                        <div className="existingList">

                            {allUserPlaylistsData.playlists?.map((card, ind) => (
                                <PlayListCard
                                    OnClickOnPlayList={handleAddToSelectedPlaylist}
                                    CreatedBy={allUserPlaylistsData?.createdBy}
                                    CreatedAt={allUserPlaylistsData.createdAt}
                                    PlayListName="lsit"
                                    data={card} />
                            ))}

                        </div>
                    </div>
                </div>

            </Modal>
            <Toaster position='bottom' />
        </>
    );
}

export default AddToPlayListModal;