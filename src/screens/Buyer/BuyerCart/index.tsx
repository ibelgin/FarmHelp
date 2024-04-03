import React, {memo, useCallback, useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
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
import Routes from 'routes/routes';
import RBSheet from 'components/RBSheet';
import Constants from 'functions/Constants';
import Button from 'components/Button';

interface BuyerCartProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerCart: React.FC<BuyerCartProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const refRBSheet = useRef<any>(null);
  const user = useSelector((state: any) => state.user);
  const [cartData, setCartData] = useState<any>({products: []});
  const [totalPrice, setTotalPrice] = useState<number>(0.0);
  const styles = getStyles(theme);

  const [phone, setPhone] = useState<any>('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderId = database().ref('Orders').push().key;
      const orderData = {
        orderId: orderId,
        buyerId: user.id,
        buyerName: user.name,
        buyerEmail: user.email,
        farmerId: cartData.farmers_incart,
        farmerName: cartData.products[0].farmerName,
        products: cartData.products,
        totalPrice: totalPrice,
        createdAt: new Date().toISOString(),
        state: 'placed',
        phone: phone,
        address: location,
      };

      await database().ref(`Orders/${orderId}`).set(orderData);
      await clearCart(user.id);
      setCartData({products: []});
      setTotalPrice(0);
      setLoading(false);
      navigation.navigate(Routes.BuyerOrders);
      refRBSheet.current.close();
    } catch (error) {
      setLoading(false);
      console.error('Error placing order:', error);
    }
  };

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
      <RBSheet ref={refRBSheet} height={Constants.height / 2} closeOnDragDown>
        <ScrollView>
          <Text style={styles.businessname}>
            Phone Number
            <Text style={{color: theme.primary}}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+1 (675) 6756 657"
            placeholderTextColor={'gray'}
          />
          <Text style={styles.businessname}>
            Location
            <Text style={{color: theme.primary}}> *</Text>
          </Text>
          <TextInput
            style={styles.address}
            value={location}
            onChangeText={setLocation}
            placeholder={"Tery's Farm, \n14th Street, Texas.\nUSA."}
            placeholderTextColor={'gray'}
            multiline={true}
            numberOfLines={3}
            blurOnSubmit={false}
            textAlignVertical="top"
            textAlign="left"
          />
          {loading ? (
            <View style={styles.activity}>
              <ActivityIndicator size={'small'} color={theme.primary} />
            </View>
          ) : (
            <Button
              title="Proceed to Payment"
              style={styles.button}
              iconName={'right'}
              iconSize={13}
              iconPosition="right"
              onPress={() => handlePlaceOrder()}
            />
          )}
        </ScrollView>
      </RBSheet>
      {cartData && cartData.products && cartData.products.length > 0 ? (
        <>
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
          <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
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
    businessname: {
      margin: 20,
      fontSize: 16,
      color: theme.text,
      marginBottom: 14,
    },
    input: {
      height: 50,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      borderWidth: 1.5,
      borderRadius: 7,
      borderColor: '#D7D7D7',
    },
    address: {
      height: 120,
      padding: 20,
      paddingTop: 15,
      marginHorizontal: 20,
      borderWidth: 1.5,
      borderRadius: 7,
      borderColor: '#D7D7D7',
    },
    button: {
      margin: 20,
    },
    activity: {
      height: 50,
      width: Constants.width,
      ...defaultStyle.center,
      marginTop: 20,
    },
  });

export default BuyerCart;
