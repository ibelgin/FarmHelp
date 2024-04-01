import React, {memo, useRef, useState, useCallback} from 'react';
import {
  Alert,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Images from 'assets/images';
import RBSheet from 'components/RBSheet';
import {useFocusEffect} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import Constants from 'functions/Constants';
import clearCart from 'functions/clearCart';

interface BuyerViewProps {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const BuyerView: React.FC<BuyerViewProps> = memo(({navigation, route}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);
  const refRBSheet = useRef<any>(null);

  const [userData, setUserData] = useState<any>({products: [{}]});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedQuantities, setSelectedQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [selectionMade, setSelectionMade] = useState<boolean>(false);

  const incrementQuantity = (productId: string, maxQuantity: number) => {
    const currentQuantity = selectedQuantities[productId] || 0;
    if (currentQuantity < maxQuantity) {
      setSelectedQuantities(prevState => ({
        ...prevState,
        [productId]: currentQuantity + 1,
      }));
      setSelectionMade(true);
    }
  };

  const decrementQuantity = (productId: string) => {
    const currentQuantity = selectedQuantities[productId] || 0;
    if (currentQuantity > 0) {
      setSelectedQuantities(prevState => ({
        ...prevState,
        [productId]: currentQuantity - 1,
      }));
      setSelectionMade(true);
    }
  };

  const addToCart = useCallback(async () => {
    const selectedProducts = Object.keys(selectedQuantities)
      .map(productId => {
        if (userData.products.hasOwnProperty(productId)) {
          const product = userData.products[productId];
          return {
            ...product,
            cartquantity: selectedQuantities[productId],
          };
        } else {
          return null;
        }
      })
      .filter(product => product !== null);

    const userRef = database().ref(`Users/${user.id}/cart/`);

    await userRef.set({
      farmers_incart: route.params.farmerid.id,
      products: selectedProducts,
    });
  }, [selectedQuantities, userData, user.id, route.params.farmerid.id]);

  useFocusEffect(
    useCallback(() => {
      if (selectionMade) {
        addToCart();
        setSelectionMade(false);
      }
    }, [addToCart, selectionMade]),
  );

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const userRef = database().ref(`Users/${route.params.farmerid.id}`);
      const snapshot = await userRef.once('value');
      const dat = snapshot.val();
      setUserData(dat);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('FarmHelp', 'Some Error occurred');
    }
  }, [route.params.farmerid.id]);

  const getIfExistInCart = useCallback(async () => {
    const userRef = database().ref(`Users/${user.id}/cart/`);
    const snapshot = await userRef.once('value');
    const dat = snapshot.val();
    if (dat.farmers_incart === '') {
      getUser();
    } else {
      Alert.alert(
        'FarmHelp',
        'Any Changes here will clear the current items in the cart ',
        [
          {
            text: 'Ok',
            onPress: () => console.log(''),
            style: 'cancel',
          },

          {
            text: 'Empty',
            onPress: () => clearCart(user.id),
            style: 'destructive',
          },
        ],
      );
      if (dat.farmers_incart === route.params.farmerid.id) {
        getUser();
      } else {
        getUser();
      }
    }
  }, [getUser, route.params.farmerid.id, user.id]);

  useFocusEffect(
    useCallback(() => {
      getIfExistInCart();
      return () => {};
    }, [getIfExistInCart]),
  );

  return (
    <View style={styles.container}>
      <View>
        <RBSheet ref={refRBSheet} height={150} closeOnDragDown>
          <View>
            <View style={styles.verified}>
              <Icons
                name="email"
                color={'gray'}
                style={styles.iconverification}
                size={18}
              />
              <Text style={styles.verification}>
                {route.params.farmerid.email}
              </Text>
            </View>
            <View style={styles.verified}>
              <Icons
                name="phone"
                color={'gray'}
                style={styles.iconverification}
                size={18}
              />
              <Text style={styles.verification}>
                {route.params.farmerid.phone}
              </Text>
            </View>
          </View>
        </RBSheet>
        <Image source={Images.landscape} style={styles.banner} />
        <View style={styles.backIconContainer}>
          <Pressable
            style={styles.backIcon}
            onPress={() => navigation.goBack()}>
            <Icons name="arrow-back" size={20} color="white" />
          </Pressable>
        </View>
        <View style={styles.profilecardview}>
          <View>
            <View style={styles.title}>
              <Text style={styles.farmername}>
                {route.params.farmerid.businessName}{' '}
              </Text>
              {userData.verified === true ? (
                <Icons name="verified" color={theme.primary} size={14} />
              ) : null}
            </View>
            <Text style={styles.location}>
              <Icon name="location-outline" size={16} color={theme.primary} />{' '}
              {route.params.farmerid.location}{' '}
            </Text>
          </View>
          <Image
            source={{uri: route.params.farmerid.photo}}
            style={styles.photo}
          />
        </View>
        <View style={styles.contactinfoview}>
          <Pressable
            style={styles.contact}
            onPress={() => {
              refRBSheet.current.open();
            }}>
            <Text>
              <Icon name="call" color={theme.text} /> {'  '} Contact Information
            </Text>
          </Pressable>
        </View>
        <View style={styles.logoutview}>
          <Text style={styles.heading}>Products Available</Text>
        </View>
      </View>
      <FlatList
        refreshing={loading}
        onRefresh={() => getUser()}
        data={Object.values(userData.products || {})}
        renderItem={({item}: any) => (
          <View style={styles.mainview}>
            <Image source={{uri: item.image}} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.price}>{'Rs. ' + item.price}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.stock}>Available Stocks</Text>
              <Text style={styles.highlight}>{item.quantity}</Text>
              <View style={styles.quantityControls}>
                <Pressable onPress={() => decrementQuantity(item.id)}>
                  <Icons name="remove-circle" color={'gray'} size={20} />
                </Pressable>
                <Text style={styles.quantityText}>
                  {selectedQuantities[item.id] || 0}
                </Text>
                <Pressable
                  onPress={() =>
                    incrementQuantity(item.id, item.quantitynumber)
                  }>
                  <Icons name="add-circle" color={'gray'} size={20} />
                </Pressable>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.noproductsview}>
            <View style={styles.background}>
              <Text style={styles.salestext}>No Products</Text>
              <Text style={styles.salesdescription}>
                Add More Products to Your Store by clicking the "Add Product"
                button Above
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    photo: {
      height: Constants.width < 500 ? 60 : 60,
      width: Constants.width < 500 ? 60 : 60,
      borderRadius: 5,
      margin: Constants.width < 500 ? 10 : 20,
    },
    profilecardview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: Constants.width < 500 ? 10 : 20,
      alignItems: 'center',
      marginTop: 20,
    },
    farmername: {
      fontSize: Constants.width < 500 ? 20 : 23,
      color: theme.text,
    },
    location: {
      marginTop: Constants.width < 500 ? 2 : 10,
      fontSize: 15,
      color: 'gray',
    },
    banner: {
      height: 200,
      width: '100%',
    },
    contact: {
      height: 50,
      width: '100%',
      ...defaultStyle.center,
      backgroundColor: theme.transparancy,
    },
    heading: {
      fontSize: 18,
      color: theme.text,
      fontWeight: '400',
    },
    contactinfoview: {
      height: 50,
      margin: 20,
      ...defaultStyle.flexRowCenter,
    },
    addbutton: {
      height: 50,
      width: 50,
      ...defaultStyle.center,
      backgroundColor: theme.transparancy,
      margin: 20,
      borderRadius: 5,
    },
    logoutview: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    logouttext: {
      color: theme.primary,
      fontWeight: '500',
    },
    logout: {
      color: 'red',
      fontWeight: '500',
      padding: 20,
    },
    verified: {
      marginHorizontal: 20,
      marginTop: 20,
      ...defaultStyle.flexRow,
    },
    iconverification: {
      marginRight: 10,
    },
    verification: {
      fontSize: 15,
      color: theme.text,
      fontWeight: '500',
    },
    salestext: {
      fontWeight: '600',
      color: 'gray',
      fontSize: 14,
    },
    salesdescription: {
      color: 'gray',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 10,
    },
    salesgraphview: {
      ...defaultStyle.flexRow,
      height: 150,
      marginHorizontal: 15,
    },
    nocharts: {
      height: '60%',
      width: '50%',
    },
    nodataview: {
      height: '100%',
      width: '50%',
      paddingLeft: 10,
      ...defaultStyle.center,
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },

    noproductsview: {
      ...defaultStyle.center,
      height: 150,
      margin: 20,
    },
    background: {
      ...defaultStyle.center,
      backgroundColor: theme.transparancy,
      height: '100%',
      width: '100%',
      padding: 50,
    },

    mainview: {
      height: 130,
      marginHorizontal: 20,
      ...defaultStyle.flexRow,
      backgroundColor: theme.transparancy,
      marginTop: 15,
      position: 'relative',
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
      fontSize: 15,
    },
    backIconContainer: {
      position: 'absolute',
      top: 50,
      left: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 50,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backIcon: {},
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    quantityText: {
      marginHorizontal: 10,
      fontSize: 16,
      color: theme.text,
    },
    addToCartButton: {
      height: 50,
      width: '90%',
      position: 'absolute',
      bottom: 20,
      left: '5%',
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addToCartButtonText: {
      fontSize: 18,
      color: theme.background,
      fontWeight: '400',
    },
  });

export default BuyerView;
