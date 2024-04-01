import React, {memo, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import {storeData} from 'functions/storage';
import Routes from 'routes/routes';

interface BuyerSettingsProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerSettings: React.FC<BuyerSettingsProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      //   navigation.navigate(Routes.Login);
    }, 3000);
  }, [navigation]);

  const LogOut = () => {
    storeData('user', null);
    navigation.push(Routes.Login);
  };

  return (
    <Container style={styles.container}>
      <Text onPress={() => LogOut()}>Log Out</Text>
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
  });

export default BuyerSettings;
