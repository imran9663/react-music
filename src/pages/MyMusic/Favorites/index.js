import React from "react";
import { useSelector } from "react-redux";
import { allFavoriteTracks } from "../../../Redux/Reducers/PlayList-slice";
import SongStrip from "../../../components/SongStrip";
import { Icons } from "../../../assets/Icons";
const Favorites = () => {
    const FavoriteList = useSelector(allFavoriteTracks);
    return (
        <div className="songlist">
            {FavoriteList.length > 0 ? (
                FavoriteList.slice()
                    ?.reverse()
                    ?.map((item, index) => <SongStrip key={index} data={item} />)
            ) : (
                <>

                    <div className="container d-flex flex-column justify-content-center gap-3 align-items-center ">
                        <Icons.BsNoMusic fill="#e3e3e3" style={{ width: "7rem" }} />
                        <p className="text-white">No Data Found</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;
