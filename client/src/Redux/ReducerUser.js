import { createReducer } from '@reduxjs/toolkit';

import { ALERT, LIMPIAR_ALERT, GET_USER, LOG_OUT_USUARIO } from './ActionUser.js';


const initialState = {
    user: {},
    alert: {}
};

const userReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(ALERT, (state, action) => {
        return {
            ...state,
            alert: action.payload
        }
    })
    .addCase(LIMPIAR_ALERT, (state) => {
        return {
            ...state,
            alert: {}
        }
    })
    .addCase(GET_USER, (state, action) => {
        return {
            ...state,
            user: action.payload
        }
    })
    .addCase(LOG_OUT_USUARIO, (state) => {
        return {
            ...state,
            user: {}
        }
    })
});

export default userReducer;
