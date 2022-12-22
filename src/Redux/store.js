import { configureStore } from "@reduxjs/toolkit";
import PlayListSlice from "./Reducers/PlayList-slice";

export default configureStore({
    reducer: {
        playList: PlayListSlice
    }
})