import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reserveInfo: [],
    loaded: false,
    num: 0
}

export const reserveInfoSlice = createSlice({
    name: "reserveInfo",
    initialState,
    reducers: {
        addReserve: (state, action) => {
            state.reserveInfo.push(action.payload);
            state.num = state.num + 1;
        },
        removeReserve: (state, action) => {
            state.reserveInfo = state.reserveInfo.filter(reserve => reserve.id !== action.payload);
            state.num = state.num - 1;
        },
        loadReserve: (state, action) => {
            state.reserveInfo = action.payload;
            state.loaded = true;
            state.num = state.reserveInfo ? state.reserveInfo.length : 0;
        }
    }
})

export const { addReserve, removeReserve, loadReserve } = reserveInfoSlice.actions;
export default reserveInfoSlice.reducer;