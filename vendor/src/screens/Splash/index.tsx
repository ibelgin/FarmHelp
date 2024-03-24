import React, {memo, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Routes from 'routes/routes';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Images from 'assets/images';

interface SplashProps {
  navigation: StackNavigationProp<any, any>;
}

const Splash: React.FC<SplashProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(Routes.Login);
    }, 3000);
  }, [navigation]);

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
