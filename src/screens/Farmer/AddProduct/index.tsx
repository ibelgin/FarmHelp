import React, {memo, useState} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import defaultStyle from 'theme/defaultStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Routes from 'routes/routes';

import Container from 'components/Container';
import Button from 'components/Button';

interface AddProductProps {
  navigation: StackNavigationProp<any, any>;
}

const AddProduct: React.FC<AddProductProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);

  const [imageUri, setImageUri] = useState<any>(null);
  const [productName, setProductName] = useState<any>('');
  const [price, setPrice] = useState<any>('');
  const [quantity, setQuantity] = useState<any>('');

  const [loading, setLoading] = useState<any>(false);

  const handleImageUpload = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        presentationStyle: 'pageSheet',
      });
      if (!response?.didCancel && response.assets?.length === 1) {
        setImageUri(response.assets[0]?.uri?.replace('file://', ''));
      }
    } catch (error) {
      console.error('Error while uploading image:', error);
    }
  };

  const extractNumberFromString = (str: string) => {
    const matches = str.match(/\d+(\.\d+)?/);
    if (matches) {
      return parseFloat(matches[0]);
    }
    return 0;
  };

  const handleAddProduct = async () => {
    setLoading(true);
    if (!productName || !price || !quantity || !imageUri) {
      Alert.alert('FarmHelp', 'Enter all values before adding to your store');
      setLoading(false);
    } else {
      try {
        const productId = Math.random().toString(36).substr(2, 9);
        const imageRef = storage().ref(`productImages/${productId}`);
        await imageRef.putFile(imageUri);

        const imageUrl = await imageRef.getDownloadURL();

        const productData = {
          id: productId,
          name: productName,
          image: imageUrl,
          price: price,
          quantity: quantity,
          quantitynumber: extractNumberFromString(quantity),
          farmerid: user.id,
          farmerName: user.name,
        };

        // Update product data in the Realtime Database under the user's node
        await database()
          .ref(`Users/${user.id}/products/${productId}`)
          .set(productData);

        setLoading(false);
        setImageUri(null);
        setProductName('');
        setPrice('');
        setQuantity('');
        Alert.alert(
          'FarmHelp',
          `${productName} has been added to your Store. Check your store's tab`,
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate(Routes.FarmerStore),
              style: 'cancel',
            },
          ],
        );
      } catch (error) {
        Alert.alert('FarmHelp', 'Some Error occurred');
        setLoading(false);
      }
    }
  };

  return (
    <Container style={styles.container}>
      <ScrollView>
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
        <Text style={styles.productimagetext}>
          Product Image<Text style={styles.star}> *</Text>
        </Text>
        <Text style={styles.productimagedescription}>
          Take a good pic of your product using your camera
        </Text>
        <Pressable
          style={styles.uploadview}
          onPress={() => handleImageUpload()}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.productimage} />
          ) : (
            <Icon name="upload" color={theme.text} size={20} />
          )}
        </Pressable>
        <Text style={styles.productimagetext}>
          Product Name<Text style={styles.star}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
          blurOnSubmit={true}
          placeholder="Rice"
          placeholderTextColor={'gray'}
        />
        <Text style={styles.productimagetext}>
          Price in Rs<Text style={styles.star}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          blurOnSubmit={true}
          keyboardType="number-pad"
          placeholder="486"
          placeholderTextColor={'gray'}
        />
        <Text style={styles.productimagetext}>
          Quantity with Measurment<Text style={styles.star}> *</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          blurOnSubmit={true}
          placeholder="13 Liters"
          placeholderTextColor={'gray'}
        />
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={theme.primary}
            style={styles.activity}
          />
        ) : (
          <Button
            title="Submit"
            iconPosition="right"
            iconName="right"
            iconSize={18}
            style={styles.button}
            onPress={() => handleAddProduct()}
          />
        )}
      </ScrollView>
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
    uploadview: {
      height: 120,
      width: 120,
      margin: 20,
      borderRadius: 7,
      ...defaultStyle.center,
      backgroundColor: theme.transparancy,
    },
    productimagetext: {
      marginHorizontal: 20,
      marginTop: 20,
      fontSize: 18,
      fontWeight: '500',
    },
    star: {
      color: theme.primary,
    },
    productimagedescription: {
      color: 'gray',
      paddingHorizontal: 20,
      paddingTop: 5,
    },
    productimage: {
      height: 120,
      width: 120,
      margin: 20,
      borderRadius: 7,
    },
    input: {
      height: 50,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      borderWidth: 1.5,
      borderRadius: 7,
      borderColor: theme.border,
      marginTop: 10,
    },
    button: {
      backgroundColor: theme.secondary,
      margin: 20,
    },
    activity: {
      marginTop: 30,
    },
  });

export default AddProduct;
