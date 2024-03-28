import {createSlice} from '@reduxjs/toolkit';

const farmerSlice = createSlice({
  name: 'farmer',
  initialState: {
    businessName: 'Belgin Jarosh',
    email: 'belginprogrammerterno@gmail.com',
    location: 'The Green Field, Chennai, India. Pin: 629153',
    mode: 'farmer',
    name: 'Belgin',
    verified: false,
    orders: [{}],
    phone: '+91 9042542868',
    photo:
      'https://lh3.googleusercontent.com/a/ACg8ocL3ln8EwHBZghV54BMqeybTQlud51ovwu0ueTIUnIn47AY=s120',
    products: [{}],
  },
  reducers: {
    setFarmerData: (state, action) => {
      return action.payload;
    },
  },
});

export const {setFarmerData} = farmerSlice.actions;
export default farmerSlice.reducer;
