import { createSlice } from "@reduxjs/toolkit";

const persistedSession = localStorage.getItem("currentSession");

const initialState ={
    currentSession: persistedSession 
    ? JSON.parse(persistedSession) 
    : null,
};

export const sessionSlice = createSlice({
    name: 'sessions',
    initialState: initialState,
    reducers: {
        setSession: (sessions, action) => {
            sessions.currentSession = action.payload;

            localStorage.setItem(
                "currentSession",
                JSON.stringify(action.payload)
            );
        },
        clearSession(state){
            state.currentSession = null;
            localStorage.removeItem("currentSession");
        },
    },
});

export const {setSession, clearSession} = sessionSlice.actions;

export const selectSessions = state => state.sessions;

export default sessionSlice.reducer;