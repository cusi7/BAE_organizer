import {configureStore} from '@reduxjs/toolkit';

import userReducer from './ReducerUser.js';

export default configureStore({
    reducer: {
      user: userReducer
    }
  });