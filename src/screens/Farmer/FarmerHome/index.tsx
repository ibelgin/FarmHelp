import React, {memo, useCallback, useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Routes from 'routes/routes';
import Images from 'assets/images';
import Constants from 'functions/Constants';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';
import TitleTextButton from 'components/TitleTextButton';
import {setFarmerData} from 'redux/farmerSlice';
import {useFocusEffect} from '@react-navigation/native';
import ProductItem from 'components/ProductItem';

interface FarmerHomeProps {
  navigation: StackNavigationProp<any, any>;
}

const FarmerHome: React.FC<FarmerHomeProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const styles = getStyles(theme);

  const [userData, setUserData] = useState<any>({products: [{}]});
  const [loading, setLoading] = useState<boolean>(true);

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

  // const getAiPredications = useCallback(async () => {}, []);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      return () => {};
    }, [getUser]),
  );

  return (
    <Container style={styles.container}>
      <ScrollView>
        <Image
          source={Images.horizontal}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.shipping}>
          <Image
            source={Images.shipping}
            style={styles.truck}
            resizeMode="contain"
          />
          <View style={styles.descriptionview}>
            <Text style={styles.description}>
              Add Your Stock here to list your stock
            </Text>
            <Pressable
              style={styles.addprodbutton}
              onPress={() => navigation.navigate(Routes.AddProduct)}>
              <Icon
                name="pluscircle"
                color={theme.background}
                style={styles.plus}
              />
              <Text style={styles.addprodtext}>Add Product</Text>
            </Pressable>
          </View>
        </View>
        <TitleTextButton
          title={'Sales and Growth'}
          buttonText="See All"
          onPress={() => console.log()}
        />
        <View style={styles.salesgraphview}>
          <Image
            source={Images.nocharts}
            style={styles.nocharts}
            resizeMode="contain"
          />
          <View style={styles.nodataview}>
            <Text style={styles.salestext}>No Data Found</Text>
            <Text style={styles.salesdescription}>
              Add more products or Create more sales for Predictions and Charts
            </Text>
          </View>
        </View>
        <TitleTextButton
          title={'Listed Products'}
          buttonText="Go To Store"
          onPress={() => navigation.navigate(Routes.FarmerStore)}
        />
        {Object.keys(userData.products || {}).length === 0 ? (
          <View style={styles.noproductsview}>
            <View style={styles.background}>
              <Text style={styles.salestext}>No Products</Text>
              <Text style={styles.salesdescription}>
                Add More Products to Your Store by clicking the "Add Product"
                button Above
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            refreshing={loading}
            onRefresh={() => getUser()}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={Object.values(userData.products)}
            renderItem={({item}) => <ProductItem product={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        <View style={styles.line} />
      </ScrollView>
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    logo: {
      height: 40,
      width: Constants.width / 2,
      marginVertical: 20,
    },
    shipping: {
      height: 150,
      paddingHorizontal: 20,
      backgroundColor: '#EDFBFD',
      ...defaultStyle.flexRow,
      marginHorizontal: 20,
      borderRadius: 7,
    },
    truck: {
      height: 150,
      width: '40%',
    },
    descriptionview: {
      paddingLeft: 20,
      width: '60%',
    },
    addprodbutton: {
      backgroundColor: theme.secondary,
      padding: 14,
      marginTop: 15,
      borderRadius: 5,
      ...defaultStyle.flexRowCenter,
    },
    addprodtext: {
      color: theme.background,
      fontSize: 14,
      fontWeight: '400',
    },
    plus: {
      marginRight: 10,
    },
    description: {
      fontWeight: '500',
      color: 'gray',
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
    },
    noproductsview: {
      marginHorizontal: 20,
      ...defaultStyle.center,
      height: 180,
    },
    background: {
      ...defaultStyle.center,
      backgroundColor: theme.transparancy,
      height: '100%',
      width: '100%',
      padding: 50,
    },
    line: {
      height: 40,
    },
  });

export default FarmerHome;
