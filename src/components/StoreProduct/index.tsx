import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import defaultStyle from 'theme/defaultStyle';

const StoreProduct = ({product, onPressEdit, onPressDelete}: any) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);

  const totalprice = product.price * product.quantitynumber;

  return (
    <View style={styles.mainview}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => onPressEdit(product)}>
        <Icon name="edit" size={15} color={'gray'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onPressDelete(product)}>
        <Icon name="trash" size={15} color="#FF7A7A" />
      </TouchableOpacity>
      <Image source={{uri: product.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.price}>{'Rs. ' + product.price}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.stock}>
          Available Stocks :
          <Text style={styles.highlight}>{product.quantity}</Text> {'\n'}
          Worth : <Text style={styles.highlight}>{totalprice} Rs.</Text>
        </Text>
      </View>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    mainview: {
      height: 130,
      marginHorizontal: 20,
      ...defaultStyle.flexRow,
      backgroundColor: theme.transparancy,
      marginTop: 15,
      position: 'relative',
    },
    editButton: {
      position: 'absolute',
      bottom: 5,
      right: 35,
      zIndex: 1,
      padding: 10,
    },
    deleteButton: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      zIndex: 1,
      padding: 10,
    },
    image: {
      flex: 1,
      height: '70%',
      borderRadius: 3,
      marginHorizontal: 15,
    },
    name: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme.text,
    },
    price: {
      fontSize: 17,
      fontWeight: '500',
      color: theme.text,
    },
    stock: {
      color: 'gray',
      fontWeight: '400',
      fontSize: 13,
      marginTop: 5,
    },
    details: {
      flex: 2,
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    highlight: {
      color: theme.text,
    },
  });

export default StoreProduct;
