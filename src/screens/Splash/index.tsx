import React, {memo, useEffect} from 'react';
import {Alert, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Routes from 'routes/routes';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Images from 'assets/images';

import {getData} from 'functions/storage';
import {setUser} from 'redux/userSlice';

interface SplashProps {
  navigation: StackNavigationProp<any, any>;
}

const Splash: React.FC<SplashProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      try {
        getData('user').then((data: any) => {
          if (data === null) {
            navigation.replace(Routes.Login);
          } else if (data.mode === 'farmer') {
            dispatch(setUser(data));
            navigation.replace(Routes.FarmerHome);
          } else {
            dispatch(setUser(data));
            navigation.replace(Routes.BuyerHome);
          }
        });
      } catch {
        Alert.alert('FarmHelp', 'Something went wrong');
      }
    }, 2000);
  }, [dispatch, navigation]);

  return (
    <Container style={styles.container}>
      <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      ...defaultStyle.center,
    },
    logo: {
      height: '50%',
      width: '70%',
    },
  });

export default Splash;
