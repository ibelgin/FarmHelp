import {createSlice} from '@reduxjs/toolkit';

const buyerSlice = createSlice({
  name: 'buyer',
  initialState: {
    businessName: 'Belgin Jarosh',
    email: 'belginprogrammerterno@gmail.com',
    location: 'The Green Field, Chennai, India. Pin: 629153',
    mode: 'farmer',
    name: 'Belgin',
    verified: false,
    orders: [{}],
    cart: [{}],
    phone: '+91 9042542868',
    photo:
      'https://lh3.googleusercontent.com/a/ACg8ocL3ln8EwHBZghV54BMqeybTQlud51ovwu0ueTIUnIn47AY=s120',
    products: [{}],
  },
  reducers: {
    setBuyerData: (state, action) => {
      return action.payload;
    },
  },
});

export const {setBuyerData} = buyerSlice.actions;
export default buyerSlice.reducer;
