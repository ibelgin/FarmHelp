import React, {memo, useEffect} from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

import Container from 'components/Container';
import Images from 'assets/images';

import Icon from 'react-native-vector-icons/AntDesign';
import Routes from 'routes/routes';

interface SplashProps {
  navigation: StackNavigationProp<any, any>;
}

const Register: React.FC<SplashProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);

  useEffect(() => {}, [navigation]);

  const goToNextScreen = (mode: string) => {
    navigation.navigate(mode);
  };

  return (
    <Container style={styles.container}>
      <View>
        <Text style={styles.text}>Hi , {user.name}</Text>
        <Text style={styles.description}>
          Lets walk you through the process
        </Text>
        <View style={styles.mainbox}>
          <Pressable
            style={styles.box}
            onPress={() => goToNextScreen(Routes.BuyerRegistration)}>
            <Icon
              name="tagso"
              size={28}
              color={theme.primary}
              style={styles.iconstyle}
            />
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit={true}
              style={styles.optiontext}>
              Buy From Farmer's
            </Text>
            <Text
              numberOfLines={3}
              adjustsFontSizeToFit={true}
              style={styles.descriptiontext}>
              I Will be searching for seller's who has the nessary things I need
            </Text>
          </Pressable>
          <Pressable
            style={styles.box}
            onPress={() => goToNextScreen(Routes.FarmerRegistraion)}>
            <Icon
              name="checksquareo"
              size={26}
              color={theme.primary}
              style={styles.iconstyle}
            />
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit={true}
              style={styles.optiontext}>
              Sell My Products
            </Text>
            <Text
              numberOfLines={3}
              adjustsFontSizeToFit={true}
              style={styles.descriptiontext}>
              I Will be selling my produce to Customer's and Business People
            </Text>
          </Pressable>
        </View>
      </View>
      <Image source={Images.shopping} resizeMode="cover" />
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: theme.background,
    },
    text: {
      marginTop: 30,
      paddingHorizontal: 20,
      fontSize: 25,
      fontWeight: '500',
      color: theme.text,
    },
    mainbox: {
      margin: 20,
      marginTop: 40,
      flexDirection: 'row',
      borderRadius: 10,
    },
    box: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.transparancy,
      marginRight: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 190,
      borderRadius: 5,
    },
    description: {
      paddingHorizontal: 20,
      marginTop: 7,
    },
    iconstyle: {
      marginBottom: 20,
    },
    optiontext: {
      fontWeight: 'bold',
      color: '#172E42',
    },
    descriptiontext: {
      marginTop: 10,
      paddingHorizontal: 5,
      fontSize: 11,
      textAlign: 'center',
    },
  });

export default Register;
