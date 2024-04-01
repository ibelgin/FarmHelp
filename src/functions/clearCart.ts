import database from '@react-native-firebase/database';

const clearCart = async (userId: string) => {
  try {
    const userRef = database().ref(`Users/${userId}/cart/`);
    await userRef.set({farmers_incart: ''});
    console.log('Cart cleared successfully.');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

export default clearCart;
