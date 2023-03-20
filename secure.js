import * as SecureStore from 'expo-secure-store';

const secure = {
  async getItem(key) {
    return JSON.parse(await SecureStore.getItemAsync(key));
  },
  async setItem(key, data) {
    SecureStore.setItemAsync(key, JSON.stringify(data));
  },
  async deleteItem(key) {
    SecureStore.deleteItemAsync(key);
  },
};

export default secure;