import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: 'belgin.confidential@gmail.com',
    familyName: 'Jarosh',
    givenName: 'Belgin',
    id: '000000000000000',
    name: 'Belgin',
    photo:
      'https://lh3.googleusercontent.com/a/ACg8ocIukjrpfsQIpjB0dxV0oFpEVZ2ULXueUNi2tSHhRmn_IUk=s120',
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
