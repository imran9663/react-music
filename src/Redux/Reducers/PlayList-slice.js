import { createSlice } from "@reduxjs/toolkit";
import { Slice } from "../constants";

const initialState = {
    data: [],
};

const PlayListSlice = createSlice({
    name: Slice.playList,
    initialState,
    reducers: {
        //getPlayListData,
        getPlayListData (state) {
            return state.data
        },
        //setPlayListData, 
        setPlayListData (state) {
            return state.data
        }
    },
});
