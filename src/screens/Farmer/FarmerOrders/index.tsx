import React, {memo, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';

interface FarmerOrdersProps {
  navigation: StackNavigationProp<any, any>;
}

const FarmerOrders: React.FC<FarmerOrdersProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      //   navigation.navigate(Routes.Login);
    }, 3000);
  }, [navigation]);

  return (
    <Container style={styles.container}>
      <Text>Farmer Orders</Text>
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

export default FarmerOrders;