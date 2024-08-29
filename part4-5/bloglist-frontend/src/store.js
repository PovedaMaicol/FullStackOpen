import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./reducers/blogReducer";


const store = configureStore({
    reducer: {
        blogs: blogSlice
    }
})

export default store