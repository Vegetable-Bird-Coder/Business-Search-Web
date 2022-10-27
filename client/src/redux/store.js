import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "./businessInfo";
import detailReducer from "./DetailInfo";

export const store = configureStore({
    reducer: {
        businessInfo: businessReducer,
        detailInfo: detailReducer
    }
})