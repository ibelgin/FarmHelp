import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Container from 'components/Container';
import database from '@react-native-firebase/database';
import Icons from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import Images from 'assets/images';
import defaultStyle from 'theme/defaultStyle';

interface BuyerOrdersProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerOrders: React.FC<BuyerOrdersProps> = memo(({}) => {
  const theme = useSelector((state: any) => state.theme);
  const user = useSelector((state: any) => state.user);
  const styles = getStyles(theme);
  const [userOrders, setUserOrders] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserOrders = async () => {
        try {
          const ordersRef = database().ref('Orders');
          const snapshot = await ordersRef
            .orderByChild('buyerId')
            .equalTo(user.id)
            .once('value');
          const ordersData = snapshot.val();
          console.log(ordersData);
          if (ordersData) {
            const ordersArray = Object.values(ordersData);
            ordersArray.sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            );
            setUserOrders(ordersArray);
          }
        } catch (error) {
          console.error('Error fetching user orders:', error);
        }
      };

      fetchUserOrders();
      return () => {};
    }, [user.id]),
  );

  const renderOrderItem = ({item}: any) => {
    const tags = item.products
      ? Object.values(item.products)
          .slice(0, 5)
          .map((product: any) => product.name)
      : [];

    const returnTextColor = (state: string) => {
      if (state === 'placed') {
        return '#E58D4B';
      } else if (state === 'delivered') {
        return '#4986C3';
      } else {
        return theme.primary;
      }
    };

    const returnBackgroundColor = (state: string) => {
      if (state === 'placed') {
        return '#FEFAF7';
      } else if (state === 'delivered') {
        return '#F1F8FE';
      } else {
        return '#F5FEFB';
      }
    };

    const returnIconName = (state: string) => {
      if (state === 'placed') {
        return 'package';
      } else if (state === 'delivered') {
        return 'truck';
      } else {
        return 'check-square';
      }
    };

    return (
      <View style={styles.orderItem}>
        <View style={styles.uppercontainer}>
          <View
            style={{
              ...styles.iconview,
              backgroundColor: returnBackgroundColor(item.state),
            }}>
            <Icons
              name={returnIconName(item.state)}
              size={20}
              color={returnTextColor(item.state)}
            />
          </View>
          <View>
            <Text
              style={{
                ...styles.total,
                color: returnTextColor(item.state),
              }}>
              Rs. {item.totalPrice}
            </Text>
            <Text style={styles.phone}>{item.phone}</Text>
            <Text style={styles.farmername}>
              {item.farmerName}{' '}
              <Text style={styles.orderid}>{item.orderId}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {tags.map((tag: string, index: number) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      {userOrders.length > 0 ? (
        <Container style={styles.container}>
          <Text style={styles.heading}>Your Orders</Text>
          <FlatList
            data={userOrders}
            renderItem={renderOrderItem}
            keyExtractor={item => item.orderId}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      ) : (
        <View style={styles.containerEmpty}>
          <View style={styles.secontainer}>
            <Image
              source={Images.noorder}
              style={styles.nochartsimage}
              resizeMode="contain"
            />
            <Text style={styles.salestext}>No Orders Found</Text>
            <Text style={styles.salesdescription}>
              Looks like you have not placed any orders yet.
            </Text>
          </View>
        </View>
      )}
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: '500',
      color: theme.text,
      marginBottom: 20,
      marginTop: 20,
    },
    flatListContent: {
      paddingBottom: 20,
    },
    orderItem: {
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: theme.border,
    },
    text: {
      fontSize: 14,
      color: theme.text,
    },
    containerEmpty: {
      backgroundColor: theme.background,
      ...defaultStyle.center,
    },
    secontainer: {
      ...defaultStyle.center,
      height: '100%',
      width: '100%',
    },
    nochartsimage: {
      height: '30%',
      width: '70%',
    },
    salestext: {
      fontWeight: '600',
      color: 'gray',
      fontSize: 14,
    },
    salesdescription: {
      color: 'gray',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 10,
      paddingHorizontal: 80,
    },
    iconview: {
      height: 40,
      width: 40,
      marginRight: 10,
      borderRadius: 3,
      backgroundColor: theme.transparancy,
      ...defaultStyle.center,
    },
    uppercontainer: {
      flexDirection: 'row',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
      borderRadius: 10,
    },
    tag: {
      marginRight: 5,
      marginBottom: 5,
      fontSize: 12,
      backgroundColor: '#f0f0f0',
      paddingVertical: 2,
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    farmername: {
      fontSize: 14,
      fontWeight: '400',
    },
    orderid: {
      fontSize: 12,
      color: 'gray',
      fontWeight: '400',
    },
    phone: {
      fontSize: 15,
      color: theme.text,
    },
    total: {
      fontSize: 18,
      color: theme.primary,
      fontWeight: '500',
    },
  });

export default BuyerOrders;
