import React, {memo, useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Routes from 'routes/routes';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Button from 'components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

import database from '@react-native-firebase/database';
import {storeData} from 'functions/storage';
import Constants from 'functions/Constants';
import {setUser} from 'redux/userSlice';

interface BuyerRegistrationProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerRegistration: React.FC<BuyerRegistrationProps> = memo(
  ({navigation}) => {
    const theme = useSelector((state: any) => state.theme);
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const styles = getStyles(theme);

    const [business, setBusiness] = useState('');
    const [gstin, setGstin] = useState('');

    const [loading, setLoading] = useState(false);

    const createUser = async () => {
      setLoading(true);
      const userRef = database().ref(`Users/${user.id}`);

      try {
        const userSnapshot = await userRef.once('value');

        if (userSnapshot.exists()) {
          Alert.alert('FarmHelp', 'User Already exists');
          navigation.replace(Routes.Login);
          setLoading(false);
          return;
        } else {
          await userRef.set({
            id: user.id,
            email: user.email,
            name: user.name,
            photo: user.photo,
            businessName: business,
            mode: 'buyer',
            gstin: gstin,
            orders: [],
            cart: [],
            createdAt: new Date().toISOString(), // Convert date to ISO string format
          });
          await storeData('loggedin', true).then(() => {
            setLoading(false);
            const data = {...user, mode: 'buyer'};
            storeData('user', data);
            dispatch(setUser(data));
            navigation.navigate(Routes.BuyerTabs);
          });
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('FarmHelp', 'Some Error Occurred');
      }
    };

    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="left"
            style={styles.goBackIcon}
            size={20}
            color={'gray'}
          />
          <Text style={styles.headers}>Register as a Buyer</Text>
        </View>
        <Text style={styles.description}>
          Buy directly from the Farmers without the need of middlemamn.
        </Text>
        <Text style={styles.businessname}>
          Business Name
          <Text style={{color: theme.primary}}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={business}
          onChangeText={setBusiness}
          placeholder="Belgin's Bakery"
          placeholderTextColor={'gray'}
        />
        <Text style={styles.businessname}>
          GST Identification number
          <Text style={{color: theme.primary}}> *</Text>
        </Text>

        <TextInput
          style={styles.input}
          value={gstin}
          onChangeText={setGstin}
          placeholder="22AAAAA0000A1Z5"
          placeholderTextColor={'gray'}
        />
        {loading ? (
          <View style={styles.activity}>
            <ActivityIndicator size={'small'} color={theme.primary} />
          </View>
        ) : (
          <Button
            title="Continue"
            style={styles.button}
            iconName={'right'}
            iconSize={13}
            iconPosition="right"
            onPress={() => createUser()}
          />
        )}
      </Container>
    );
  },
);

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      marginTop: 20,
      ...defaultStyle.flexDirection,
      alignItems: 'center',
    },
    goBackIcon: {
      marginLeft: 20,
    },
    headers: {
      fontSize: 21,
      paddingHorizontal: 15,
      color: theme.text,
      fontWeight: '500',
    },
    description: {
      fontSize: 15,
      color: 'gray',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    input: {
      height: 50,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      borderWidth: 2,
      borderRadius: 7,
      borderColor: theme.border,
    },
    businessname: {
      margin: 20,
      fontSize: 16,
      color: theme.text,
      marginBottom: 14,
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

export default BuyerRegistration;
