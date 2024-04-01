import React, {memo, useCallback, useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';
import Container from 'components/Container';
import database from '@react-native-firebase/database'; // Import Firebase database
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import clearCart from 'functions/clearCart';
import Images from 'assets/images';

interface BuyerCartProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerCart: React.FC<BuyerCartProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const [cartData, setCartData] = useState<any>({products: []});
  const [totalPrice, setTotalPrice] = useState<number>(0.0);
  const styles = getStyles(theme);

  const fetchCartData = useCallback(async () => {
    try {
      const userCartRef = database().ref(`Users/${user.id}/cart`);
      const snapshot = await userCartRef.once('value');
      const cartData1 = snapshot.val();
      setCartData(cartData1 || {products: []});
      const dat = cartData1?.products
        ?.reduce((total: number, item: any) => {
          return total + item.price * item.cartquantity;
        }, 0)
        .toFixed(2);
      setTotalPrice(dat);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }, [user.id]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCartData();
      return () => {};
    }, [fetchCartData]),
  );

  const handleDeleteItem = async (index: number) => {
    try {
      const updatedProducts = [...cartData.products];
      updatedProducts.splice(index, 1);
      await database()
        .ref(`Users/${user.id}/cart/products`)
        .set(updatedProducts);
      setCartData((prevState: any) => ({
        ...prevState,
        products: updatedProducts,
      }));

      if (updatedProducts.length === 0) {
        await clearCart(user.id);
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  return (
    <Container style={styles.container}>
      {cartData && cartData.products && cartData.products.length > 0 ? (
        <>
          <Text style={styles.heading}>Your Cart</Text>
          <FlatList
            data={cartData.products || []}
            renderItem={({item, index}) => (
              <View style={styles.mainview}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteItem(index)}>
                  <Icon name="trash" size={15} color="#FF7A7A" />
                </TouchableOpacity>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.price}>
                    {'Rs. ' + item.price * item.cartquantity}{' '}
                    <Text style={styles.desc}>( {item.price} / Product )</Text>
                  </Text>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.stock}>
                    Available Stocks :
                    <Text style={styles.highlight}>{item.quantity}</Text> {'\n'}
                    Ordered Quantity :{' '}
                    <Text style={styles.highlight}>{item.cartquantity}</Text>
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Payment', {totalPrice})}>
            <View style={styles.payNowButton}>
              <Text style={styles.payNowText}>Pay Now Rs. {totalPrice}</Text>
            </View>
          </TouchableWithoutFeedback>
        </>
      ) : (
        <View style={styles.containerEmpty}>
          <View style={styles.secontainer}>
            <Image
              source={Images.emptycart}
              style={styles.nochartsimage}
              resizeMode="contain"
            />
            <Text style={styles.salestext}>Your Cart is Empty</Text>
            <Text style={styles.salesdescription}>
              Looks like you haven't added anything to your cart yet
            </Text>
          </View>
        </View>
      )}
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    containerEmpty: {
      flex: 1,
      backgroundColor: theme.background,
      ...defaultStyle.center,
    },
    heading: {
      fontSize: 20,
      fontWeight: '500',
      color: 'gray',
      marginBottom: 10,
      marginHorizontal: 20,
      marginTop: 20,
    },
    emptyCartText: {
      fontSize: 20,
      fontWeight: '400',
      color: theme.text,
    },
    mainview: {
      height: 130,
      marginHorizontal: 20,
      ...defaultStyle.flexRow,
      backgroundColor: theme.transparancy,
      marginTop: 15,
      position: 'relative',
    },
    editButton: {
      position: 'absolute',
      bottom: 5,
      right: 35,
      zIndex: 1,
      padding: 10,
    },
    deleteButton: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      zIndex: 1,
      padding: 10,
    },
    image: {
      flex: 1,
      height: '70%',
      borderRadius: 3,
      marginHorizontal: 15,
    },
    name: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.text,
    },
    price: {
      fontSize: 17,
      fontWeight: '500',
      color: theme.text,
    },
    stock: {
      color: 'gray',
      fontWeight: '400',
      fontSize: 13,
      marginTop: 5,
    },
    details: {
      flex: 2,
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    highlight: {
      color: theme.text,
    },
    desc: {
      color: 'gray',
      fontSize: 14,
    },
    nochartsimage: {
      height: '30%',
      width: '70%',
    },
    secontainer: {
      ...defaultStyle.center,
      height: '100%',
      width: '100%',
    },
    salestext: {
      fontWeight: '600',
      color: 'gray',
      fontSize: 14,
    },
    salesdescription: {
      color: 'gray',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 10,
      paddingHorizontal: 80,
    },
    payNowButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 10,
    },
    payNowText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default BuyerCart;
