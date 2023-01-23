import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../constants";
import { insertArrToSpecificIndex, isObject } from "../../utils";

const initialState = {
    data: [],
    gbl_player: {
        songid: "",
        lastSongIndex: null,
        songIndex: null,
        data: {},
    },
    allFavoriteTracks: []
};

const PlayListSlice = createSlice({
    name: Slice.playList,
    initialState,
    reducers: {
        setLocalPlayListData (state, action) {
            //checking the payload is an array  and state  has already songs
            if (action.payload?.length > 0 && state.data.length > 0) {
                const CureentSongIndex = state.gbl_player.songIndex;
                const addedlist = insertArrToSpecificIndex(
                    state.data,
                    CureentSongIndex + 1,
                    action.payload
                );
                state.data = addedlist;
                state.gbl_player = {
                    songIndex: 0,
                    data: addedlist[0],
                };
            } else if (action.payload?.length > 0 && state.data.length === 0) {
                state.data = action.payload;
                state.gbl_player = {
                    songIndex: 0,
                    data: action.payload[0],
                };
            } else {
                if (state.data.length === 0) {
                    state.data = [action.payload];
                    state.gbl_player = {
                        songIndex: 0,
                        data: action.payload,
                    };
                }
                //if state has multiple songs already
                else if (state.data.length > 0) {
                    //if state has multiple songs and the playload  track is already present
                    if (state.data.some((el) => el.id === action.payload.id)) {
                        state.data.filter((value, ind) => {
                            if (value.id === action.payload.id) {
                                state.gbl_player = {
                                    songIndex: ind,
                                    data: state.data[ind],
                                };
                                return true;
                            }
                        });
                    } else {
                        // console.log("setLocalPlayListData ELSE of ELSE of ELSE");
                        const CureentSongIndex = state.gbl_player.songIndex;
                        const addedlist = insertArrToSpecificIndex(
                            state.data,
                            CureentSongIndex + 1,
                            action.payload
                        );
                        state.data = addedlist;
                        state.gbl_player = {
                            songIndex: CureentSongIndex + 1,
                            data: addedlist[CureentSongIndex + 1],
                        };
                    }
                }
            }
        },
        setNextTrack (state, action) {
            state.gbl_player = {
                songIndex: action.payload.songIndex,
                lastSongIndex:
                    action.payload.songIndex - 1 < 0 ? action.payload.songIndex - 1 : 0,
                data:
                    state.data.length > 0
                        ? state.data[action.payload.songIndex]
                        : action.payload.data,
            };
        },
        setPreviousTrack (state, action) {
            console.log("set next track action", action.payload);
            state.gbl_player = {
                songIndex: action.payload.songIndex,
                lastSongIndex: action.payload.songIndex,
                data:
                    state.data.length > 0
                        ? state.data[action.payload.songIndex]
                        : action.payload.data,
            };
        },
        removeTrackFromPlayList (state, action) {
            state.data = state.data.filter((track) => {
                if (track.id !== action.payload) {
                    return track;
                }
            });
        },
        addToQueue (state, action) {
            if (!state.data.some((el) => el.id === action.payload.id)) {
                state.data = [...state.data, action.payload];
            }
        },
        addAndPlayNextTrack (state, action) {
            const CureentSongIndex = state.gbl_player.songIndex;
            if (state.data.length > 0) {
                const addedlist = insertArrToSpecificIndex(
                    state.data,
                    CureentSongIndex + 1,
                    action.payload
                );
                state.data = addedlist;
            }
            else {
                state.data = [action.payload];
            }

        },
        clearPlayList (state, action) {
            state.data = initialState.data;
            state.gbl_player = initialState.gbl_player
        },
        setToFavoritesTracks (state, action) {
            if (Array.isArray(action.payload) && action.payload.length > 0) {
                state.allFavoriteTracks = action.payload;
            }
            if (isObject(action.payload)) {
                if (!state.allFavoriteTracks.some((el) => el.id === action.payload.id)) {
                    state.allFavoriteTracks = [...state.allFavoriteTracks, action.payload];
                }
            }
        },
        removeFromFavorites (state, action) {
            if (typeof action.payload === "string" && action.payload !== '' && state.allFavoriteTracks.some((el) => el.id === action.payload)) {
                state.allFavoriteTracks = state.allFavoriteTracks.filter(val => val.id !== action.payload)
            }
        }
    },
});
export const {
    setLocalPlayListData,
    addToQueue,
    addAndPlayNextTrack,
    setNextTrack,
    removeTrackFromPlayList,
    setPreviousTrack,
    clearPlayList,
    setToFavoritesTracks,
    removeFromFavorites
} = PlayListSlice.actions;
export const currentPlaylist = (state) => state.playList.data;
export const currentTrack = (state) => state.playList.gbl_player;
export const allFavoriteTracks = (state) => state.playList.allFavoriteTracks;
export default PlayListSlice.reducer;
