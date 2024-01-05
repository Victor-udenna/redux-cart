import { createSlice } from "@reduxjs/toolkit";


const uislice = createSlice({
    name: "ui",
    initialState: {
        notification: null
    },

    reducers: {
     showNotification (state, action) {
        state.notification = {
            message: action.payload.message,
            type: action.payload.type,
            open : action.payload.open
        }
     }   
    }
})

export const uiActions = uislice.actions;

export default uislice