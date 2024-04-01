import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchItem = ({
  businessName,
  phone,
  verified,
  photo,
  products,
  theme,
  onPress,
}: any) => {
  const tags = products
    ? Object.values(products)
        .slice(0, 5)
        .map((product: any) => product.name)
    : [];

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{uri: photo}} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <View style={styles.businessNameContainer}>
          <Text style={styles.businessName}>{businessName}</Text>
          {verified && (
            <Icon
              name="verified"
              color={theme.primary}
              style={styles.iconverification}
              size={15}
            />
          )}
        </View>
        <Text style={styles.phone}>{phone}</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag: string, index: number) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
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
  infoContainer: {
    flex: 1,
  },
  businessNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 12,
    color: 'gray',
    paddingVertical: 1,
  },
  iconverification: {
    marginLeft: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap tags to next line if they overflow
    marginTop: 5,
    borderRadius: 10,
  },
  tag: {
    marginRight: 5,
    marginBottom: 5, // Add marginBottom to create space between tags
    fontSize: 12,
    backgroundColor: '#f0f0f0',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default SearchItem;
