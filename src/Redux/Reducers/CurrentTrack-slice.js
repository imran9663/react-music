import { createSlice } from "@reduxjs/toolkit"
import { Slice } from "../constants"

const initialState = {
    gbl_player: {
        state: false,
        songid: '',
        songIndex: null,
        data: {}
    }
}
const CurrentTrackSlice = createSlice({
    name: Slice.currentTrack,
    initialState,
    reducers: {

        set_gbl_player (state, action) {
            state.gbl_player = action.payload
        },
        playSingleSong (state, action) {

        }
    }

})
const { set_gbl_player } = CurrentTrackSlice.actions;
export const currentTrack = (state) => state.currentTrack.gbl_player
export default CurrentTrackSlice.reducer