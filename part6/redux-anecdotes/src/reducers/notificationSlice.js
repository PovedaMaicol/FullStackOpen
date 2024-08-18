import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    // los reducers son los mismos actions
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification() {
            return ''
        },
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions;


export const setTimedNotification = (content, duration) => {
    return dispatch => {
        dispatch(setNotification(content));

        setTimeout(() => {
            dispatch(clearNotification());
        }, duration * 1000)
    }
}

export default notificationSlice.reducer;