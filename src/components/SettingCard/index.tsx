import React, {memo} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import defaultStyle from 'theme/defaultStyle';

interface SettingCardProps {
  icon?: string;
  title?: string;
  onPress?: string;
  heading?: boolean;
  headingTitle?: string;
}

const SettingCard = memo(
  ({icon = '', title, onPress, heading, headingTitle}: SettingCardProps) => {
    const theme = useSelector((state: any) => state.theme);
    const styles = getStyles(theme);

    return (
      <Pressable onPress={() => onPress}>
        {heading ? (
          <View style={styles.header}>
            <Text style={styles.headingtext}>{headingTitle}</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={defaultStyle.flexRow}>
              <Icon name={icon} size={20} color={'#5c5c5c'} />
              <Text style={styles.subheading}>{title}</Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  },
);

export default SettingCard;

const getStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      height: 50,
      backgroundColor: theme,
      justifyContent: 'center',
      paddingLeft: 20,
    },
    headingtext: {
      color: 'gray',
    },
    content: {
      height: 50,
      ...defaultStyle.flexRowSpace,
      paddingHorizontal: 20,
    },
    subheading: {
      fontSize: 17,
      paddingLeft: 15,
      color: '#5c5c5c',
    },
  });
