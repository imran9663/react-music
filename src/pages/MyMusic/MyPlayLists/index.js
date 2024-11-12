import React from "react";
import "./style.scss";
import { allUserPlaylists } from "../../../Redux/Reducers/PlayList-slice";
import { useSelector } from "react-redux";
import PlayListCard from "../../../components/PlayListCard";
import RouteStrings from "../../../utils/RouteStrings";
import { useNavigate } from "react-router";
import { Icons } from "../../../assets/Icons";
const MyPlayLists = () => {
    const navigate = useNavigate();
    const allUserPlaylistsData = useSelector(allUserPlaylists);
    const handleRouteToPlaylist = (id) => {
        navigate(RouteStrings.userPlaylist + id);
    };
    return (
        <div className="myplaylist-container">
            {
                allUserPlaylistsData?.playlists?.length > 0 ?
                    allUserPlaylistsData?.playlists?.map((card, ind) => (
                        <PlayListCard
                            OnClickOnPlayList={handleRouteToPlaylist}
                            CreatedBy={allUserPlaylistsData?.createdBy}
                            CreatedAt={allUserPlaylistsData.createdAt}
                            data={card}
                        />
                    ))
                    : <>
                        <div className="container d-flex flex-column justify-content-center gap-3 align-items-center ">
                            <Icons.BsNoMusic fill="#e3e3e3" style={{ width: "7rem" }} />
                            <p className="text-white">No Data Found</p>
                        </div>
                    </>
            }

        </div>
    );
};

export default MyPlayLists;
