import React, {memo} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import defaultStyle from 'theme/defaultStyle';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: string;
  iconSize?: number;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = memo(
  ({
    title,
    onPress,
    backgroundColor,
    style,
    textStyle,
    iconName,
    iconSize,
    iconPosition = 'left',
  }) => {
    const theme = useSelector((state: any) => state.theme);
    const styles = getStyles(theme);

    const renderIcon = () => {
      if (!iconName) {
        return null;
      }

      const iconComponent = (
        <Icon
          name={iconName}
          style={styles.icon}
          size={iconSize}
          color={theme.background}
        />
      );

      if (iconPosition === 'left') {
        return (
          <View style={styles.iconview}>
            {iconComponent}
            <Text style={[styles.title, textStyle]}>{title}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.iconview}>
            <Text style={[styles.title, textStyle]}>{title}</Text>
            {iconComponent}
          </View>
        );
      }
    };

    return (
      <Pressable
        style={[
          styles.container,
          {backgroundColor: backgroundColor || theme.secondary, ...style},
        ]}
        onPress={onPress}>
        {renderIcon()}
      </Pressable>
    );
  },
);

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      height: 56,
      borderRadius: 6,
      ...defaultStyle.center,
    },
    title: {
      alignSelf: 'center',
      fontWeight: '500',
      fontSize: 16,
      fontFamily: 'MaerskHeadline-Light',
      color: theme.background,
    },
    iconview: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 15,
      marginLeft: 15,
    },
  });

export default Button;
