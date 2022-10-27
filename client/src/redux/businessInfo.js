import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchResult: null,
    displaySearchResult: false
}

export const businessInfoSlice = createSlice({
    name: "businessInfo",
    initialState,
    reducers: {
        loadBusinessInfo: (state, action) => {
            state.searchResult = action.payload;
            state.displaySearchResult = true;
        },
        unloadBusinessInfo: (state) => {
            state.searchResult = null;
            state.displaySearchResult = false;
        },
        hideBusinessInfo: (state) => {
            state.displaySearchResult = false;
        },
        showBusinessInfo: (state) => {
            state.displaySearchResult = true;
        }
    }
})

export const { loadBusinessInfo, unloadBusinessInfo, hideBusinessInfo, showBusinessInfo } = businessInfoSlice.actions;

export default businessInfoSlice.reducer;