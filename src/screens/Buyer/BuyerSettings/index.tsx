import React, {memo} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {storeData} from 'functions/storage';
import Routes from 'routes/routes';
import Images from 'assets/images';
import Constants from 'functions/Constants';
import SettingCard from 'components/SettingCard';

interface BuyerSettingsProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerSettings: React.FC<BuyerSettingsProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const buyerData = useSelector((state: any) => state.buyerReducer);
  const styles = getStyles(theme);

  const LogOut = () => {
    storeData('user', null);
    navigation.push(Routes.Login);
  };

  return (
    <View style={styles.container}>
      <Image source={Images.landscape} style={styles.banner} />
      <View style={styles.profilecardview}>
        <View>
          <View style={styles.title}>
            <Text style={styles.farmername}>{buyerData.givenName} </Text>
          </View>
          <Text style={styles.location}>
            <Icons name="email" size={16} color={theme.text} />{' '}
            {buyerData.email}{' '}
          </Text>
        </View>
        <Image source={{uri: buyerData.photo}} style={styles.photo} />
      </View>
      <SettingCard icon="message1" title="Customer Support" />
      <SettingCard icon="form" title="Edit Data" />
      <Text style={styles.logout} onPress={() => LogOut()}>
        Log Out
      </Text>
    </View>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    banner: {
      height: 200,
      width: '100%',
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
    logout: {
      fontSize: 17,
      paddingHorizontal: 20,
      color: 'red',
      marginTop: 10,
    },
  });

export default BuyerSettings;
