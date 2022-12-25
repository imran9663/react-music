import { configureStore } from "@reduxjs/toolkit";
import PlayListSlice from "./Reducers/PlayList-slice";
// import CurrentTrackSlice from "./Reducers/CurrentTrack-slice";

export default configureStore({
    reducer: {
        playList: PlayListSlice,
        // currentTrack: CurrentTrackSlice,
    }
})