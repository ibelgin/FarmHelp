import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import farmerReducer from './farmerSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    farmerData: farmerReducer,
  },
});
