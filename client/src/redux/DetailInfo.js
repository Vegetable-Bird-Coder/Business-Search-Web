import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    detailContent: null,
    displayDetailContent: false,
    type: "Business details"
}

export const detailInfoSlice = createSlice({
    name: "detailInfo",
    initialState,
    reducers: {
        loadDetailInfo: (state, action) => {
            state.detailContent = action.payload;
            state.displayDetailContent = true;
        },
        unloadDetailInfo: (state) => {
            state.detailContent = null;
            state.displayDetailContent = false;
            state.type = "Business details"
        },
        switchType: (state, action) => {
            state.type = action.payload;
        }
    }
})

export const { loadDetailInfo, unloadDetailInfo, switchType } = detailInfoSlice.actions;

export default detailInfoSlice.reducer;