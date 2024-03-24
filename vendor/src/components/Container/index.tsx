import React from 'react';
import {
  ViewProps,
  ViewStyle,
  PressableStateCallbackType,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';

interface Props extends ViewProps {
  children?:
    | React.ReactNode
    | ((state: PressableStateCallbackType) => React.ReactNode)
    | any;
  style?: ViewStyle;
}

const Container: React.FC<Props> = ({children, style, ...rest}) => {
  const theme = useSelector((state: any) => state.theme);

  return (
    <SafeAreaView
      style={[{backgroundColor: theme.background}, style]}
      {...rest}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      {children}
    </SafeAreaView>
  );
};

export default Container;
