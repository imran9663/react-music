import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../constants";

const initialState = {
    data: [],
    gbl_player: {
        state: false,
        songid: '',
        songIndex: 0
    }
};

const PlayListSlice = createSlice({
    name: Slice.playList,
    initialState,
    reducers: {
        //getLocalPlayListData,
        getLocalPlayListData (state) {
            return state.data
        },
        //setLocalPlayListData, 
        setLocalPlayListData (state, action) {
            console.log(" setLocalPlayListData data", action.payload);
            state.data = [action.payload, ...state.data,]
            // return state.data
        },
        get_gbl_player (state) {
            return state.gbl_player
        },
        set_gbl_player (state, action) {
            state.gbl_player = action.payload
        }

    },
});
export const { get_gbl_player, set_gbl_player, getLocalPlayListData, setLocalPlayListData } = PlayListSlice.actions
export const currentPlaylist = (state) => state.playList.data
export const currentTrack = (state) => state.playList.gbl_player
export default PlayListSlice.reducer
