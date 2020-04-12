import {observable, action, autorun, computed} from 'mobx';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-timezone';
import {persist} from 'mobx-persist';

const ErrorToast = message => {
  ToastAndroid.show('Hata Oluştu...', ToastAndroid.SHORT);
};

class DataStore {
  @persist('object') @observable liveData = {data: [], date: ''};

  fetchData = async () => {
    const response = await fetch(
      'https://4sr554ds02.execute-api.eu-central-1.amazonaws.com/dev/get',
    );
    const data = await response.json();
    return data;
  };

  async syncData() {
    if (this.liveData.data === [] || this.liveData.date === '') {
      this.liveData = await this.fetchData();
    } else {
      var currentDate = moment()
        .tz('Europe/Istanbul')
        .format();
      var localeDate = moment(this.liveData.date)
        .tz('Europe/Istanbul')
        .format();
      var diff = moment(localeDate).diff(currentDate, 'minutes');
      if (Math.abs(diff) > 10) {
        try {
          this.liveData = await this.fetchData();
        } catch (e) {
          ErrorToast();
        }
      }
    }
  }

  constructor() {
    this.syncData();
  }
}

export default DataStore;
