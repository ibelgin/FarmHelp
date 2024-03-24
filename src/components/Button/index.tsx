import React, {memo} from 'react';
import {Text, Pressable, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import defaultStyle from 'style/defaultStyle';
import {useSelector} from 'react-redux';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = memo(
  ({title, onPress, backgroundColor, style, textStyle}) => {
    const theme = useSelector((state: any) => state.theme);
    const styles = getStyles(theme);
    return (
      <Pressable
        style={[
          styles.container,
          {backgroundColor: backgroundColor || theme.buttonColor, ...style},
        ]}
        onPress={onPress}>
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </Pressable>
    );
  },
);

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      height: 56,
      borderRadius: 10,
      ...defaultStyle.center,
    },
    title: {
      alignSelf: 'center',
      fontWeight: '500',
      fontSize: 16,
      fontFamily: 'MaerskHeadline-Light',
      color: theme.background,
    },
  });

export default Button;
