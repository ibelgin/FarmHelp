import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Routes from 'routes/routes';
import {storeData} from 'functions/storage';
import Images from 'assets/images';
import Constants from 'functions/Constants';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import TitleTextButton from 'components/TitleTextButton';

interface FarmerHomeProps {
  navigation: StackNavigationProp<any, any>;
}

const FarmerHome: React.FC<FarmerHomeProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);

  const [userData, setUserData] = useState<any>();

  const getUser = useCallback(async () => {
    try {
      const userRef = firestore().collection('Users').doc(user.id);
      const doc = await userRef.get();
      setUserData(doc.data);
      console.log(doc.data);
    } catch (err) {
      Alert.alert('FarmHelp', 'Some Error occurred');
    }
  }, [user.id]);

  const getProducts = useCallback(async () => {}, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const LogOut = () => {
    storeData('user', null);
    navigation.replace(Routes.Login);
  };

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
            <Pressable style={styles.addprodbutton}>
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
        <TitleTextButton
          title={'Listed Products'}
          buttonText="Go To Store"
          onPress={() => console.log()}
        />
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
      height: 50,
      width: Constants.width / 2,
      margin: 20,
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
  });

export default FarmerHome;
