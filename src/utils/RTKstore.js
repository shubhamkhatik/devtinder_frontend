import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const RTKstore = configureStore({
    reducer: {
        user : userReducer
    }

})

export default RTKstore;