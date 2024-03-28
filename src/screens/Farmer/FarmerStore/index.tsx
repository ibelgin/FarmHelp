import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Images from 'assets/images';
import Routes from 'routes/routes';
import {storeData} from 'functions/storage';
import RBSheet from 'components/RBSheet';

interface FarmerStoreProps {
  navigation: StackNavigationProp<any, any>;
}

const FarmerStore: React.FC<FarmerStoreProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const farmerData = useSelector((state: any) => state.farmerData);
  const styles = getStyles(theme);
  const refRBSheet = useRef<any>(null);
  const [isContactInfo, setContactInfo] = useState<boolean>(false);

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
    <View style={styles.container}>
      <ScrollView>
        <RBSheet ref={refRBSheet} height={150} closeOnDragDown>
          {!isContactInfo ? (
            <>
              <View style={styles.verified}>
                <Icons
                  name="verified"
                  color={theme.primary}
                  style={styles.iconverification}
                  size={18}
                />
                <Text style={styles.verification}>Apply for Verification</Text>
              </View>
              <Pressable onPress={() => LogOut()}>
                <Text style={styles.logout}>Log Out</Text>
              </Pressable>
            </>
          ) : (
            <View>
              <View style={styles.verified}>
                <Icons
                  name="email"
                  color={'gray'}
                  style={styles.iconverification}
                  size={18}
                />
                <Text style={styles.verification}>{farmerData.email}</Text>
              </View>
              <View style={styles.verified}>
                <Icons
                  name="phone"
                  color={'gray'}
                  style={styles.iconverification}
                  size={18}
                />
                <Text style={styles.verification}>{farmerData.phone}</Text>
              </View>
            </View>
          )}
        </RBSheet>
        <Image source={Images.landscape} style={styles.banner} />
        <View style={styles.profilecardview}>
          <View>
            <Text style={styles.farmername}>
              {farmerData.businessName}{' '}
              <Icons name="verified" color={theme.primary} size={19} />
            </Text>
            <Text style={styles.location}>
              <Icon name="location-outline" size={16} color={theme.primary} />{' '}
              {farmerData.location}
            </Text>
          </View>
          <Image source={{uri: farmerData.photo}} style={styles.photo} />
        </View>
        <View style={styles.contactinfoview}>
          <Pressable
            style={styles.contact}
            onPress={() => {
              setContactInfo(true);
              refRBSheet.current.open();
            }}>
            <Text>
              <Icon name="call" color={theme.text} /> {'  '} Contact Information
            </Text>
          </Pressable>
          <Pressable
            style={styles.addbutton}
            onPress={() => {
              setContactInfo(false);
              refRBSheet.current.open();
            }}>
            <Icon name="settings-outline" color={theme.text} size={19} />
          </Pressable>
        </View>
        <View style={styles.logoutview}>
          <Text style={styles.heading}>My Products</Text>
          <Pressable onPress={() => navigation.navigate(Routes.AddProduct)}>
            <Text style={styles.logouttext}>Add Product</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    photo: {
      height: 60,
      width: 60,
      borderRadius: 5,
      margin: 20,
    },
    profilecardview: {
      ...defaultStyle.flexRowSpace,
      paddingHorizontal: 20,
      alignItems: 'center',
      marginTop: 20,
    },
    farmername: {
      fontSize: 23,
      color: theme.text,
      textAlign: 'center',
    },
    location: {
      marginTop: 5,
      fontSize: 15,
      color: 'gray',
    },
    banner: {
      height: 200,
      width: '100%',
    },
    contact: {
      height: 50,
      width: '80%',
      ...defaultStyle.center,
      backgroundColor: theme.transparancy,
    },
    heading: {
      fontSize: 18,
      color: theme.text,
      fontWeight: '400',
    },
    contactinfoview: {
      height: 50,
      margin: 10,
      ...defaultStyle.flexRow,
    },
    addbutton: {
      height: 50,
      width: 50,
      ...defaultStyle.center,
      backgroundColor: theme.transparancy,
      margin: 20,
      borderRadius: 5,
    },
    logoutview: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    logouttext: {
      color: theme.primary,
      fontWeight: '500',
    },
    logout: {
      color: 'red',
      fontWeight: '500',
      padding: 20,
    },
    verified: {
      marginHorizontal: 20,
      marginTop: 20,
      ...defaultStyle.flexRow,
    },
    iconverification: {
      marginRight: 10,
    },
    verification: {
      fontSize: 15,
      color: theme.text,
      fontWeight: '500',
    },
  });

export default FarmerStore;
