import React, {memo, useCallback, useState} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import Container from 'components/Container';
import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import SearchItem from 'components/SearchItem';
import Routes from 'routes/routes';

interface BuyerSearchProps {
  navigation: StackNavigationProp<any, any>;
}

const BuyerSearch: React.FC<BuyerSearchProps> = memo(({navigation}) => {
  const theme = useSelector((state: any) => state.theme);
  const styles = getStyles(theme);

  const [search, setSearch] = useState<string>('');
  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const usersSnapshot = await database().ref('Users').once('value');
      const usersData = usersSnapshot.val();
      if (usersData) {
        const filteredFarmers = Object.values(usersData).filter(
          (user: any) => user.mode === 'farmer',
        );
        setFarmers(filteredFarmers);
        setLoading(false);
      }
    } catch (err) {
      Alert.alert('FarmHelp', 'Some Error occurred');
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      return () => {};
    }, [getUser]),
  );

  const filterFarmers = (query: string) => {
    const filtered = farmers.filter(farmer =>
      farmer.businessName.toLowerCase().includes(query.toLowerCase()),
    );
    return filtered;
  };

  const handleSearch = () => {
    setIsSearching(true);
    const filtered = filterFarmers(search);
    setFarmers(filtered);
  };

  const handleClearSearch = () => {
    setSearch('');
    setIsSearching(false);
    getUser();
  };

  const renderItem = ({item}: {item: any}) => (
    <SearchItem
      businessName={item.businessName}
      phone={item.phone}
      verified={item.verified}
      photo={item.photo}
      theme={theme}
      products={item.products}
      onPress={() => navigation.navigate(Routes.BuyerView, {farmerid: item})}
    />
  );

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>Search Store</Text>
      <Text style={styles.desc}>
        The Tags shows the top 5 product in the store.
      </Text>
      <View style={styles.textinputview}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.input1}
          placeholder="Search for a Store"
          placeholderTextColor="gray"
        />
        {isSearching ? (
          <Pressable onPress={handleClearSearch} style={styles.searchButton}>
            <Icon name="x" color={'gray'} style={styles.textinputicon} />
          </Pressable>
        ) : (
          <Pressable onPress={handleSearch} style={styles.searchButton}>
            <View style={styles.searchTextContainer}>
              <Icon name="search" color={'gray'} style={styles.textinputicon} />
              <Text style={styles.searchText}>Search</Text>
            </View>
          </Pressable>
        )}
      </View>
      <FlatList
        refreshing={loading}
        onRefresh={() => getUser()}
        data={farmers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </Container>
  );
});

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    textinputview: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme.primary,
      borderRadius: 5,
      paddingHorizontal: 5,
      paddingRight: 20,
      marginTop: 20,
      marginHorizontal: 20,
    },
    input1: {
      flex: 1,
      paddingVertical: 13,
      paddingHorizontal: 10,
      fontSize: 16,
      color: 'black',
    },
    textinputicon: {
      marginRight: 5,
    },
    searchTextContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      flexDirection: 'row',
    },
    searchText: {
      color: 'gray',
      fontSize: 14,
      fontWeight: '600',
    },
    input: {
      flex: 1,
      color: 'black',
      fontSize: 16,
    },
    title: {
      fontWeight: '500',
      color: theme.text,
      fontSize: 18,
      marginTop: 20,
      paddingHorizontal: 20,
    },
    list: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      color: theme.text,
    },
    desc: {
      fontSize: 14,
      color: 'gray',
      paddingHorizontal: 20,
      paddingTop: 5,
    },
    searchButton: {
      padding: 10,
    },
  });

export default BuyerSearch;
