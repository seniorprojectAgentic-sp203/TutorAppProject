import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import sessionReducer from './sessionSlice';


export default configureStore({
    reducer: {
        users: userReducer,
        sessions: sessionReducer
    }
})