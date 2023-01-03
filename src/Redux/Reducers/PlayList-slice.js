import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../constants";

const initialState = {
    data: [],
    gbl_player: {
        songid: '',
        songIndex: null,
        data: {}
    }
};

const PlayListSlice = createSlice({
    name: Slice.playList,
    initialState,
    reducers: {

        //setLocalPlayListData, 
        setLocalPlayListData (state, action) {
            // if (action.payload?.length > 0 && state.data.length > 0) {

            // }
            // else
            if (action.payload?.length > 0) {
                console.log("action length is =>", action.payload.length);
                state.data = action.payload
                state.gbl_player = {
                    songIndex: 0,
                    data: action.payload[0],
                }
            }
            else {
                if (state.data.length === 0) {
                    state.data = [action.payload]
                    state.gbl_player = {
                        songIndex: 0,
                        data: action.payload,
                    }
                }
                else if (state.data.length > 0) {
                    console.log("action.payload", action.payload);
                    state.data = [...state.data, action.payload]
                    // state.data = state.data.splice(state.gbl_player.songIndex + 1, 0, action.payload)
                    state.gbl_player = {
                        songIndex: state.gbl_player.songIndex + 1,
                        data: action.payload
                    }
                }
            }
        },
        setNextTrack (state, action) {
            console.log("set next track action", action.payload);
            state.gbl_player = {
                songIndex: action.payload.songIndex,
                data: action.payload.data,
            }
        },
        setPreviousTrack (state, action) {
            console.log("set next track action", action.payload);
        },
        removeTrackFromPlayList (state, action) {
            state.data = state.data.filter(track => {
                if (track.id !== action.payload) {
                    return track
                }
            })
        }
    },
});
export const { setLocalPlayListData, setNextTrack, removeTrackFromPlayList, setPreviousTrack } = PlayListSlice.actions
export const currentPlaylist = (state) => state.playList.data
export const currentTrack = (state) => state.playList.gbl_player
export default PlayListSlice.reducer
