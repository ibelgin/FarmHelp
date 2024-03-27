import React, {memo, useEffect} from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import defaultStyle from 'theme/defaultStyle';

import Container from 'components/Container';
import Images from 'assets/images';
import Routes from 'routes/routes';

import Icons from 'react-native-vector-icons/AntDesign';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {setUser} from 'redux/userSlice';
import {storeData} from 'functions/storage';

interface LoginProps {
  navigation: StackNavigationProp<any, any>;
}

const Login: React.FC<LoginProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  // const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
    });
  }, [navigation]);

  const checkIfUserExists = async (userInfo: any) => {
    try {
      const userRef = firestore().collection('Users').doc(userInfo.id);
      const doc = await userRef.get();

      if (doc.exists) {
        if (doc.data()?.mode === 'farmer') {
          const data = {...userInfo, mode: 'farmer'};
          dispatch(setUser(data));
          storeData('user', data);
          navigation.replace(Routes.FarmerHome);
        } else {
          const data = {...userInfo, mode: 'buyer'};
          storeData('user', data);
          dispatch(setUser(data));
          navigation.replace(Routes.BuyerHome);
        }
      } else {
        storeData('user', userInfo);
        navigation.navigate(Routes.Register);
      }
      setLoading(false);
    } catch (error) {
      Alert.alert(
        'FarmHelp',
        'Some Issue Occured when trying to fetch the user information',
      );
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(setUser(userInfo.user));
      checkIfUserExists(userInfo.user);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    // const userInfo = {
    //   idToken:
    //     'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkZjVlNzEwZWRmZWJlY2JlZmE5YTYxNDk1NjU0ZDAzYzBiOGVkZjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzODcxNjM3OTA4NTktdmloNXNyM2JzN3V2c2tyOWUwOG5iNDdnOXZhcW4zdDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzODcxNjM3OTA4NTktdmloNXNyM2JzN3V2c2tyOWUwOG5iNDdnOXZhcW4zdDQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQzNDE5MDUzNDU5ODYzNTM4MjUiLCJlbWFpbCI6ImJlbGdpbi5jb25maWRlbnRpYWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJWck8tYWdRQ1BsNUhRTVVUaTR2TUlnIiwibm9uY2UiOiJBYnZjakh1UHhwOUx3VEpxbU8yNXM2RFNwYkdLa05LaVQ4em1DNkJtRDFBIiwibmFtZSI6IkJlbGdpbiBKYXJvc2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSXVranJwZnNRSXBqQjBkeFYwb0ZwRVZaMlVMWHVlVU5pMnRTSGhSbW5fSVVrPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkJlbGdpbiIsImZhbWlseV9uYW1lIjoiSmFyb3NoIiwiaWF0IjoxNzExMjgxNzcyLCJleHAiOjE3MTEyODUzNzJ9.u1cmrs7mVx0cGj1gpPeZbNOB-94e9CRibUHHTxm9mIBVKLsI_WqMQ3pBYdVBUXrgyg3gfTTgOSfR9EQSCD5T7DXLZ0zDG61ubyMQaEQEqAwXKWjA--Vp3FFhMh1bO6U6J5seegMABJBmAruk_vHOxVOpQkHzXZ36VctQ9homujQqSOv1ApVX2bGsRAQkB6I6tHev36wxaK-gVgXZh3Vrpr9ccabsFI4tyMtvAzoSnK-MishXfGB5FVCRnrDgPCwfOT6TPrzTInTK4_wlG-4XjJhs7--Vr7NumfupQWemefkdp-lZDYRXvXfuEy6PceyHOx_GDM_C6DeLWPKed9k7kw',
    //   scopes: [
    //     'https://www.googleapis.com/auth/userinfo.profile',
    //     'openid',
    //     'https://www.googleapis.com/auth/userinfo.email',
    //   ],
    //   serverAuthCode: null,
    //   user: {
    //     email: 'belgin.confidential@gmail.com',
    //     familyName: 'Jarosh',
    //     givenName: 'Belgin',
    //     id: '114341905345986353825',
    //     name: 'Belgin Jarosh',
    //     photo:
    //       'https://lh3.googleusercontent.com/a/ACg8ocIukjrpfsQIpjB0dxV0oFpEVZ2ULXueUNi2tSHhRmn_IUk=s120',
    //   },
    // };
  };
  return (
    <Container style={styles.container}>
      <Image source={Images.signin} style={styles.artwork} />
      <Text style={styles.title}>
        Welcome to <Text style={{color: theme.primary}}>FarmHelp</Text>
      </Text>
      <Text style={styles.description}>Paving the Way for Direct Deals</Text>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={theme.primary}
          style={styles.activityloader}
        />
      ) : (
        <Pressable style={styles.buttonpressable} onPress={() => signIn()}>
          <Icons
            name="google"
            color={theme.background}
            size={20}
            style={styles.icon}
          />
          <Text style={styles.buttontext}>Sign In with Google</Text>
        </Pressable>
      )}
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    artwork: {
      height: '80%',
    },
    logo: {
      width: '100%',
    },
    title: {
      paddingHorizontal: 20,
      fontSize: 30,
      fontWeight: '500',
      color: theme.text,
    },
    description: {
      paddingHorizontal: 20,
      marginTop: 5,
    },
    buttonpressable: {
      padding: 17,
      margin: 20,
      marginTop: 30,
      borderRadius: 3,
      backgroundColor: theme.primary,
      ...defaultStyle.flexRow,
    },
    buttontext: {
      color: theme.background,
      fontSize: 18,
      fontWeight: '500',
    },
    icon: {
      marginRight: '5%',
    },
    activityloader: {
      marginTop: 30,
    },
  });

export default Login;
