import { createReducer } from '@reduxjs/toolkit';

import { ALERT, LIMPIAR_ALERT } from './ActionUser.js';


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
});

export default userReducer;
