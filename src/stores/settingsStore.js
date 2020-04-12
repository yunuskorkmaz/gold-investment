import {observable, action, autorun, computed} from 'mobx';
import {persist} from 'mobx-persist';
class SettingsStore {
  @persist @observable darkMode = false;

  @persist @observable useAws = false;

  @observable currentTab = 'Home';

  @action setUseAws() {
    this.useAws = !this.useAws;
  }

  @action setDarkMode = async () => {
    this.darkMode = !this.darkMode;
  };

  @action setCurrentTab(tab) {
    this.currentTab = tab;
  }
  constructor() {}
}

export default SettingsStore;
