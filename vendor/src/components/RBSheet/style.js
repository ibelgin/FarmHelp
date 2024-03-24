import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00000077',
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    height: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    width: 150,
    height: 4,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#ccc',
  },
});

export default styles;
