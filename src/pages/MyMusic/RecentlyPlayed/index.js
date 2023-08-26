import React from 'react';

import SongStrip from '../../../components/SongStrip';
import { useSelector } from 'react-redux';
import { allRecentlyPlayedTracks } from '../../../Redux/Reducers/PlayList-slice';
import { useEffect } from 'react';
const RecentlyPlayed = () => {
    const recentlyPlayedList = useSelector(allRecentlyPlayedTracks);
    return (
        <div className="songlist">
            {recentlyPlayedList?.slice()?.reverse()?.map((item, ind) => <SongStrip key={ind} data={item} />)}
        </div>
    )
}

export default RecentlyPlayed