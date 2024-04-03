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
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Images from 'assets/images';
import Routes from 'routes/routes';
import {storeData} from 'functions/storage';
import RBSheet from 'components/RBSheet';
import {useFocusEffect} from '@react-navigation/native';
import {setFarmerData} from 'redux/farmerSlice';
import database from '@react-native-firebase/database';
import StoreProduct from 'components/StoreProduct';
import Constants from 'functions/Constants';

interface FarmerStoreProps {
  navigation: StackNavigationProp<any, any>;
}

const FarmerStore: React.FC<FarmerStoreProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const farmerData = useSelector((state: any) => state.farmerData);
  const styles = getStyles(theme);
  const refRBSheet = useRef<any>(null);
  const dispatch = useDispatch();

  const [isContactInfo, setContactInfo] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({products: [{}]});
  const [loading, setLoading] = useState<boolean>(true);

  const LogOut = () => {
    storeData('user', null);
    refRBSheet.current.close();
    navigation.push(Routes.Login);
  };

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const userRef = database().ref(`Users/${user.id}`);
      const snapshot = await userRef.once('value');
      const dat = snapshot.val();
      setUserData(dat);
      dispatch(setFarmerData(dat));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('FarmHelp', 'Some Error occurred');
    }
  }, [dispatch, user.id]);

  useFocusEffect(
    useCallback(() => {
      getUser();
      return () => {};
    }, [getUser]),
  );

  const onPressDelete = (product: any) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            try {
              await database()
                .ref(`Users/${user.id}/products/${product.id}`)
                .remove()
                .then(() => {
                  getUser();
                });
            } catch (error) {
              Alert.alert('FarmHelp', 'Some Error occurred');
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <RBSheet ref={refRBSheet} height={150} closeOnDragDown>
          {!isContactInfo ? (
            <>
              <View style={styles.verified}>
                <Icons
                  name="verified"
                  color={theme.primary}
                  style={styles.iconverification}
                  size={18}
                />
                <Text style={styles.verification}>Apply for Verification</Text>
              </View>
              <Pressable onPress={() => LogOut()}>
                <Text style={styles.logout}>Log Out</Text>
              </Pressable>
            </>
          ) : (
            <View>
              <View style={styles.verified}>
                <Icons
                  name="email"
                  color={'gray'}
                  style={styles.iconverification}
                  size={18}
                />
                <Text style={styles.verification}>{farmerData.email}</Text>
              </View>
              <View style={styles.verified}>
                <Icons
                  name="phone"
                  color={'gray'}
                  style={styles.iconverification}
                  size={18}
                />
                <Text style={styles.verification}>{farmerData.phone}</Text>
              </View>
            </View>
          )}
        </RBSheet>
        <Image source={Images.landscape} style={styles.banner} />
        <View style={styles.profilecardview}>
          <View>
            <View style={styles.title}>
              <Text style={styles.farmername}>{farmerData.businessName} </Text>
              <Icons name="verified" color={theme.primary} size={14} />
            </View>

            <Text style={styles.location}>
              <Icon name="location-outline" size={16} color={theme.primary} />{' '}
              {farmerData.location}{' '}
            </Text>
          </View>
          <Image source={{uri: farmerData.photo}} style={styles.photo} />
        </View>
        <View style={styles.contactinfoview}>
          <Pressable
            style={styles.contact}
            onPress={() => {
              setContactInfo(true);
              refRBSheet.current.open();
            }}>
            <Text>
              <Icon name="call" color={theme.text} /> {'  '} Contact Information
            </Text>
          </Pressable>
          <Pressable
            style={styles.addbutton}
            onPress={() => {
              setContactInfo(false);
              refRBSheet.current.open();
            }}>
            <Icon name="settings-outline" color={theme.text} size={19} />
          </Pressable>
        </View>
        <View style={styles.logoutview}>
          <Text style={styles.heading}>My Products</Text>
          <Pressable onPress={() => navigation.navigate(Routes.AddProduct)}>
            <Text style={styles.logouttext}>Add Product</Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        refreshing={loading}
        onRefresh={() => getUser()}
        data={Object.values(userData.products || {})}
        renderItem={({item}) => (
          <StoreProduct
            product={item}
            onPressDelete={() => onPressDelete(item)}
          />
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
      width: '80%',
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
      margin: 10,
      ...defaultStyle.flexRow,
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
  });

export default FarmerStore;
