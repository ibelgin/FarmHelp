import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import farmerReducer from './farmerSlice';
import buyerReducer from './buyerSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    farmerData: farmerReducer,
    buyerReducer: buyerReducer,
  },
});
