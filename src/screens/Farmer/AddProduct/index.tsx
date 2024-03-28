import React, {memo, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';

interface AddProductProps {
  navigation: StackNavigationProp<any, any>;
}

const AddProduct: React.FC<AddProductProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      //   navigation.navigate(Routes.Login);
    }, 3000);
  }, [navigation]);

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="left"
          style={styles.goBackIcon}
          size={20}
          color={'gray'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headers}>Add Product</Text>
      </View>
      <Text style={styles.description}>
        Details entered here will be displayed directly to the store. You can
        edit deatils later too.
      </Text>
    </Container>
  );
});

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
  });

export default AddProduct;
