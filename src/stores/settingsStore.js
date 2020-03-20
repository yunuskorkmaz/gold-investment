import {observable, action, autorun, computed} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
class SettingsStore {
  @observable count = 1;

  @observable settings = {
    darkMode: false,
  };

  @computed get darkMode() {
    return this.settings.darkMode;
  }

  @action setDarkMode = async () => {
    if (this.settings.darkMode !== null) {
      this.settings.darkMode = !this.settings.darkMode;
    } else {
      this.settings.darkMode = true;
    }
    await AsyncStorage.setItem('settings', JSON.stringify(this.settings));
  };

  constructor() {
    AsyncStorage.getItem('settings').then(data => {
      if (data) {
        this.settings = JSON.parse(data);
      } else {
        AsyncStorage.setItem('settings', JSON.stringify(this.settings)).then(
          a => {
            this.settings = JSON.parse({darkMode: true});
          },
        );
      }
    });
  }
}

export default new SettingsStore();
