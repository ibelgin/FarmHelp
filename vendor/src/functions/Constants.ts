import {Dimensions} from 'react-native';

interface Constants {
  width: number;
  height: number;
}

const Constants: Constants = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default Constants;
