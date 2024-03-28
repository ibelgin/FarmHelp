import React, {memo, useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Images from 'assets/images';

interface FarmerAIProps {
  navigation: StackNavigationProp<any, any>;
}

const FarmerAI: React.FC<FarmerAIProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      //   navigation.navigate(Routes.Login);
    }, 3000);
  }, [navigation]);

  return (
    <Container style={styles.container}>
      <View style={styles.secontainer}>
        <Image
          source={Images.nocharts2}
          style={styles.nochartsimage}
          resizeMode="contain"
        />
        <Text style={styles.salestext}>No Data Found</Text>
        <Text style={styles.salesdescription}>
          Add more products or Create more sales for Predictions and Charts
        </Text>
      </View>
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    nochartsimage: {
      height: '30%',
      width: '70%',
    },
    secontainer: {
      ...defaultStyle.center,
      height: '100%',
      width: '100%',
    },
    salestext: {
      fontWeight: '600',
      color: 'gray',
      fontSize: 14,
      marginTop: 50,
    },
    salesdescription: {
      color: 'gray',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 10,
      paddingHorizontal: 80,
    },
  });

export default FarmerAI;
