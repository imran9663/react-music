import React, { useEffect } from "react";
import "./style.scss";
import { Icons } from "../../assets/Icons";
import { formatDate, ParseString } from "../../utils";
import { get } from "loadsh"
const PlayListCard = ({ data, OnClickOnPlayList, CreatedBy, CreatedAt }) => {
    const { playListData, playListName, playlistId } = data;
    const getImageURL = (index) => get(playListData, `${index}.image[0].link`, Icons.defualtImage)
        ;
    const handleClick = (id) => {
        OnClickOnPlayList(id)
    }
    return (
        <button
            onClick={() => handleClick(playlistId)}
            className={"playList-newCard mb-3"}
        >
            <div className="img-wrapper">
                <img
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = Icons.defualtImage;
                    }}
                    src={getImageURL(0)}
                    alt="album art"
                    className="img-wrapper-img"
                />

                <img
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.src = Icons.defualtImage;
                        currentTarget.onerror = null;
                    }}
                    src={getImageURL(1)}
                    alt="album art"
                    className="img-wrapper-img"
                />

                <img
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = Icons.defualtImage;
                    }}
                    src={getImageURL(2)}
                    alt="album art"
                    className="img-wrapper-img"
                />
                <img
                    loading="lazy"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = Icons.defualtImage;
                    }}
                    src={getImageURL(3)}
                    alt="album art"
                    className="img-wrapper-img"
                />
            </div>
            {
                <div className="newCard-overlay">
                    <p className="newCard-overlay-name">
                        {ParseString(playListName)}
                    </p>
                    <div className="creator-details">
                        <p className="creator-details-creator">{CreatedBy}</p>
                        <p className="creator-details-time">{formatDate(CreatedAt)}</p>
                    </div>
                </div>
            }
        </button>
    );
};

export default PlayListCard;
