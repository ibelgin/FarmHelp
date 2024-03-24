import {createSlice} from '@reduxjs/toolkit';
import {themes} from 'theme/themes';

const themeSlice = createSlice({
  name: 'theme',
  initialState: themes.light,
  reducers: {
    setTheme: (state, action) => {
      return action.payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
