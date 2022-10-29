import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "./businessInfo";
import detailReducer from "./detailInfo";
import reserveReducer from "./reserveInfo";

export const store = configureStore({
    reducer: {
        businessInfo: businessReducer,
        detailInfo: detailReducer,
        reserveInfo: reserveReducer
    }
})