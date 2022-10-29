import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reserveInfo: [],
    loaded: false
}

export const reserveInfoSlice = createSlice({
    name: "reserveInfo",
    initialState,
    reducers: {
        addReserve: (state, action) => {
            state.reserveInfo.push(action.payload);
        },
        removeReserve: (state, action) => {
            state.reserveInfo.filter(reserve => reserve.id !== action.payload);
        },
        loadReserve: (state, action) => {
            state.reserveInfo = action.payload;
            state.loaded = true;
        }
    }
})

export const { addReserve, removeReserve, loadReserve } = reserveInfoSlice.actions;
export default reserveInfoSlice.reducer;