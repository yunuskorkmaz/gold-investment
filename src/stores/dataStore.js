import {observable, action, autorun, computed} from 'mobx';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-timezone';

const ErrorToast = message => {
  ToastAndroid.show('Hata Oluştu...', ToastAndroid.SHORT);
};

class DataStore {
  @observable liveData = [];

  @observable test = {};

  fetchData = async () => {
    const response = await fetch(
      'https://4sr554ds02.execute-api.eu-central-1.amazonaws.com/dev/get',
    );
    const data = await response.json();
    return data;
  };

  syncData = async () => {
    console.log('start sync :::::::::::::::::::::::::::::::::::::::::');
    var localData = await AsyncStorage.getItem('liveData');
    var localDataJson = JSON.parse(localData);
    if (localData && localDataJson.hasOwnProperty('data')) {
      console.log('local data');
      localData = JSON.parse(localData);
      var currentDate = moment()
        .tz('Europe/Istanbul')
        .format();
      var localdate = moment(localData.date)
        .tz('Europe/Istanbul')
        .format();
      var diff = moment(localdate).diff(currentDate, 'minutes');
      if (Math.abs(diff) > 15) {
        console.log('date > 2');
        try {
          var responser = await this.fetchData();
          await this.setLiveData(responser);
        } catch (e) {
          ErrorToast();
        }
      } else {
        console.log('data < 2');
        this.setLiveData(localData);
      }
    } else {
      console.log('not local data');
      try {
        var response = await this.fetchData();
        await this.setLiveData(response);
      } catch (e) {
        ErrorToast();
      }
    }
  };

  @action setLiveData = async data => {
    await AsyncStorage.setItem('liveData', JSON.stringify(data), async err => {
      if (!err) {
        console.log('set variable');
        this.liveData = JSON.parse(await AsyncStorage.getItem('liveData'));
      }
    });
  };

  @action setClear = async () => {
    await AsyncStorage.removeItem('liveData');
    this.liveData = {};
  };

  async setCtorLocalData() {
    var localData = await AsyncStorage.getItem('liveData');
    if (localData && localData.hasOwnProperty('data')) {
      this.setLiveData(JSON.parse(localData));
    }
  }

  constructor() {
    this.setCtorLocalData();
    this.syncData();
  }
}

export default DataStore;
