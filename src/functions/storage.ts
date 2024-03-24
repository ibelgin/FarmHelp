import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getData = async (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
