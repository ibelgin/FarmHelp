import React, {memo, useCallback, useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
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
import {useFocusEffect} from '@react-navigation/native';
import {setBuyerData} from 'redux/buyerSlice';
import SearchItem from 'components/SearchItem';

interface BuyerHomeProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerHome: React.FC<BuyerHomeProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const styles = getStyles(theme);

  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const usersSnapshot = await database()
        .ref('Users')
        .limitToFirst(5)
        .once('value');
      const usersData = usersSnapshot.val();
      if (usersData) {
        const filteredFarmers = Object.values(usersData).filter(
          (usern: any) => usern.mode === 'farmer',
        );
        setFarmers(filteredFarmers);
        setLoading(false);
      }
    } catch (err) {
      Alert.alert('FarmHelp', 'Some Error occurred');
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setBuyerData(user));
      getUser();
      return () => {};
    }, [dispatch, getUser, user]),
  );

  const renderItem = ({item}: {item: any}) => (
    <SearchItem
      businessName={item.businessName}
      phone={item.phone}
      verified={item.verified}
      photo={item.photo}
      theme={theme}
      products={item.products}
      onPress={() => navigation.navigate(Routes.BuyerView, {farmerid: item})}
    />
  );

  return (
    <Container style={styles.container}>
      <Image
        source={Images.horizontal}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.shipping}>
        <Image
          source={Images.store}
          style={styles.truck}
          resizeMode="contain"
        />
        <View style={styles.descriptionview}>
          <Text style={styles.description}>
            Find fair priced farmers, avoiding reseller markups.
          </Text>
          <Pressable
            style={styles.addprodbutton}
            onPress={() => navigation.navigate(Routes.BuyerSearch)}>
            <Icon name="search1" color={theme.background} style={styles.plus} />
            <Text style={styles.addprodtext}>Search for Store</Text>
          </Pressable>
        </View>
      </View>
      <TitleTextButton
        title={'Search for Store'}
        buttonText="Search Store"
        onPress={() => navigation.navigate(Routes.BuyerSearch)}
      />
      <FlatList
        refreshing={loading}
        onRefresh={() => getUser()}
        data={farmers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.line} />
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
    list: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
  });

export default BuyerHome;
