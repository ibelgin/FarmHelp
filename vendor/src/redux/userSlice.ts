import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    phone: '+910000000000',
    email: 'user@example.com',
    country: {
      name: 'India',
    },
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
