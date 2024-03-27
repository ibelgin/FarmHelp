import React, {memo, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Routes from 'routes/routes';
import {storeData} from 'functions/storage';

interface BuyerHomeProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerHome: React.FC<BuyerHomeProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      //   navigation.navigate(Routes.Login);
    }, 3000);
  }, [navigation]);

  const LogOut = () => {
    storeData('user', null);
    navigation.replace(Routes.Login);
  };

  return (
    <Container style={styles.container}>
      <Text>{JSON.stringify(user)}</Text>
      <Text onPress={() => LogOut()}>Buyer Home</Text>
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

export default BuyerHome;
