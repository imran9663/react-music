import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../constants";

const initialState = {
    data: [],
};

const PlayListSlice = createSlice({
    name: Slice.playList,
    initialState,
    reducers: {
        //getLocalPlayListData,
        getLocalPlayListData (state,) {
            return state.data
        },
        //setLocalPlayListData, 
        setLocalPlayListData (state, action) {
            console.log(" setLocalPlayListData data", action.payload);
            state.data = [action.payload, ...state.data,]
            // return state.data
        }
    },
});
export const { getLocalPlayListData, setLocalPlayListData } = PlayListSlice.actions
export const currentPlaylist = (state) => state.playList.data
export default PlayListSlice.reducer
