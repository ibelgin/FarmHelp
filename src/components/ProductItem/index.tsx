import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const ProductItem = ({product}: any) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);

  const totalprice = product.price * product.quantitynumber;

  return (
    <View style={styles.mainview}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.price}>{'Rs. ' + product.price}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.stock} numberOfLines={3} adjustsFontSizeToFit>
        Available Stocks :{' '}
        <Text style={styles.highlight}>{product.quantity}</Text>. Worth :{' '}
        <Text style={styles.highlight}>{totalprice} Rs.</Text>
      </Text>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    mainview: {
      height: 220,
      width: 160,
      backgroundColor: theme.transparancy,
      marginLeft: 15,
      marginTop: 10,
    },
    image: {
      width: 130,
      height: 100,
      margin: 10,
      borderRadius: 3,
      marginHorizontal: 15,
    },
    name: {
      paddingHorizontal: 15,
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.text,
    },
    price: {
      paddingHorizontal: 15,
      fontSize: 17,
      fontWeight: '500',
      color: theme.text,
      marginTop: 10,
    },
    stock: {
      paddingHorizontal: 15,
      marginTop: 5,
      color: 'gray',
      fontWeight: '400',
      fontSize: 13,
    },
    highlight: {
      color: theme.text,
    },
  });

export default ProductItem;
