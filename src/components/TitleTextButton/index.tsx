import React, {memo} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import defaultStyle from 'theme/defaultStyle';

interface TitleTextButtonProps {
  title?: string;
  buttonText?: string;
  onPress: () => void;
}

const TitleTextButton = memo(
  ({title, buttonText, onPress}: TitleTextButtonProps) => {
    const theme = useSelector((state: any) => state.theme);
    const styles = getStyles(theme);
    return (
      <View style={styles.container}>
        <View style={styles.title_view}>
          <Text style={styles.text} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <TouchableOpacity style={styles.button_style} onPress={onPress}>
          <Text style={styles.textdesc} numberOfLines={1}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

export default TitleTextButton;

const getStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      padding: 20,
      ...defaultStyle.flexDirection,
    },
    titlestyle: {
      color: theme.text,
    },
    title_view: {
      width: '70%',
    },
    button_style: {
      width: '30%',
      ...defaultStyle.flexDirection,
      ...defaultStyle.flexRowRight,
    },
    text: {
      color: 'gray',
      fontWeight: '400',
      fontSize: 20,
    },
    textdesc: {
      color: theme.primary,
      fontSize: 17,
      fontWeight: '500',
    },
  });
};
