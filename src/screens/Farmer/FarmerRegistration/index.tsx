import React, {memo, useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Routes from 'routes/routes';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Button from 'components/Button';
import Icon from 'react-native-vector-icons/AntDesign';

import firestore from '@react-native-firebase/firestore';
import {storeData} from 'functions/storage';
import Constants from 'functions/Constants';
import {setUser} from 'redux/userSlice';

interface FarmerRegistraionProps {
  navigation: StackNavigationProp<any, any>;
}

const FarmerRegistraion: React.FC<FarmerRegistraionProps> = memo(
  ({navigation}) => {
    const theme = useSelector((state: any) => state.theme);
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const styles = getStyles(theme);

    const [business, setBusiness] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    const [loading, setLoading] = useState(false);

    const createUser = async () => {
      setLoading(true);
      const userRef = firestore().collection('Users').doc(user.id);

      try {
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          Alert.alert('FarmHelp', 'User Already exists');
          navigation.replace(Routes.Login);
          setLoading(false);
          return;
        } else {
          await userRef.set({
            email: user.email,
            name: user.name,
            photo: user.photo,
            businessName: business,
            mode: 'farmer',
            phone: phone,
            location: location,
            products: [{}],
            orders: [{}],
            createdAt: new Date(),
          });
          await storeData('loggedin', true).then(() => {
            setLoading(false);
            const data = {...user, mode: 'farmer'};
            storeData('user', data);
            dispatch(setUser(data));
            navigation.replace(Routes.FarmerTabs);
          });
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('FarmHelp', 'Some Error Occoured');
      }
    };

    return (
      <Container style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Icon
              name="left"
              style={styles.goBackIcon}
              size={20}
              color={'gray'}
            />
            <Text style={styles.headers}>Register as a Farmer</Text>
          </View>
          <Text style={styles.description}>
            Sell directly to Restaurents or Buyer's without the need of
            middlemamn.
          </Text>
          <Text style={styles.businessname}>
            Your Name
            <Text style={{color: theme.primary}}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={business}
            onChangeText={setBusiness}
            placeholder="Belgin Jarosh"
            placeholderTextColor={'gray'}
          />
          <Text style={styles.businessname}>
            Phone Number
            <Text style={{color: theme.primary}}> *</Text>
          </Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="22AAAAA0000A1Z5"
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
            placeholder="Belgin Jarosh"
            placeholderTextColor={'gray'}
            multiline={true}
            numberOfLines={3}
            blurOnSubmit={false}
            textAlignVertical="top"
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
        </ScrollView>
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
      borderWidth: 1.5,
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
    address: {
      height: 120,
      padding: 20,
      paddingTop: 15,
      marginHorizontal: 20,
      borderWidth: 1.5,
      borderRadius: 7,
      borderColor: theme.border,
    },
  });

export default FarmerRegistraion;
