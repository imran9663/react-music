import React, { useEffect, useState } from "react";
import { Icons } from "../../assets/Icons";
import { ParseString, getNamefromArray } from "../../utils";
import RouteStrings from "../../utils/RouteStrings";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    addAndPlayNextTrack,
    addToQueue,
    allFavoriteTracks,
    removeFromFavorites,
    removeTrackFromPlayList,
    setLocalPlayListData,
    setToFavoritesTracks,
} from "../../Redux/Reducers/PlayList-slice";
import "./style.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { deleteReqest, postRequestWithInstence } from "../../apis/Base/serviceMethods";
import { configURL } from "../../apis/Base/config";
const SongStrip = ({ data }) => {
    const [isFavorite, setisFavorite] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allFavoriteTracksList = useSelector(allFavoriteTracks);
    const handleClick = (id) => {
        navigate(RouteStrings.song + id);
    };
    useEffect(() => {
        checkIsFavorite();
    }, []);

    const checkIsFavorite = () => {
        if (Object.values(data).length > 0) {
            allFavoriteTracksList.some((el) => el.id === data.id) &&
                setisFavorite(true);
        }
    };
    const handleClickDropDownItem = (songData, newAction) => {
        switch (newAction) {
            case "playNext":
                console.log("adding to next index");
                dispatch(addAndPlayNextTrack(songData));
                break;
            case "addtoQueue":
                dispatch(addToQueue(songData));
                break;
            case "addtoFavorite":
                dispatch(setToFavoritesTracks(songData));
                callFavoriteApi(songData);
                break;
            case "removeFromFavorite":
                dispatch(removeFromFavorites(songData?.id));
                callremoveFromFavoriteApi(songData?.id);
                console.log("remove From Fvaorites");
                break;
            default:
                break;
        }
    };

    const handlePlaySong = (songData) => {
        dispatch(setLocalPlayListData(songData));
    };
    return (
        <>
            <div key={data?.id} className="homepage-songlist-card">
                <img
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = Icons.defualtImage;
                    }}
                    onClick={() => handleClick(data?.id)}
                    className="img-fluid homepage-songlist-card-img "
                    src={data?.image[1].link}
                    alt="album-art"
                />
                <div
                    onClick={() => handleClick(data?.id)}
                    className="homepage-songlist-card-info"
                >
                    <p className="homepage-songlist-card-info-songName">

                        {ParseString(data?.name)}
                    </p>
                    <p className="homepage-songlist-card-info-artistName">
                        {getNamefromArray(data?.primaryArtists)}
                    </p>
                </div>
                {data?.downloadUrl?.length > 0 && (
                    <div className="homepage-songlist-card-controls">
                        <button
                            onClick={() => handlePlaySong(data)}
                            className="btn homepage-songlist-card-controls-btn "
                        >
                            <Icons.BsPlayFill />
                        </button>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="dark"
                                id="dropdown-basic"
                                className="homepage-songlist-card-controls-btn"
                            >
                                <Icons.BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark" className="dd-menu">
                                <Dropdown.Item
                                    onClick={() => handleClickDropDownItem(data, "playNext")}
                                >
                                    <span>
                                        <Icons.IoPlaySkipForward />
                                    </span>
                                    Play next
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleClickDropDownItem(data, "addtoQueue")}
                                >
                                    <span>
                                        <Icons.BiAddToQueue />
                                    </span>
                                    Add to queue
                                </Dropdown.Item>
                                {isFavorite ? (
                                    <Dropdown.Item
                                        onClick={() =>
                                            handleClickDropDownItem(data, "removeFromFavorite")
                                        }
                                    >
                                        <span>
                                            <Icons.AiOutlineCloseCircle />
                                        </span>
                                        Remove From Favorites
                                    </Dropdown.Item>
                                ) : (
                                    <Dropdown.Item
                                        onClick={() =>
                                            handleClickDropDownItem(data, "addtoFavorite")
                                        }
                                    >
                                        <span>
                                            <Icons.BsHeart />
                                        </span>
                                        Add to Favorites
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
            </div>
        </>
    );
};
export default SongStrip;

export const callFavoriteApi = async (data) => {
    await postRequestWithInstence(configURL.favorite, { data: data })
        .then((res) => {
            console.log("res", res.data);
            return res.data
        })
        .catch((err) => {
            console.log("err=>0", err);
            return err
        });
};
export const callremoveFromFavoriteApi = async (id) => {
    await deleteReqest(`${configURL.favorite}/${id}`)
        .then((res) => {
            console.log("res", res.data);
            return res.data
        })
        .catch((err) => {
            console.log("err=>0", err);
            return err
        });
};
