import React from 'react'
import { useSelector } from 'react-redux'
import { allFavoriteTracks } from '../../../Redux/Reducers/PlayList-slice'
import SongStrip from '../../../components/SongStrip'
const Favorites = () => {
    const FavoriteList = useSelector(allFavoriteTracks)
    return (
        <div className="songlist">
            {FavoriteList.slice()?.reverse()?.map((item, index) => <SongStrip key={index} data={item} />)}
        </div>
    )
}

export default Favorites