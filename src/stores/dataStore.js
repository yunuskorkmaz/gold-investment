import {observable, action, autorun, computed} from 'mobx';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-timezone';

const log = message => {
	ToastAndroid.show(message, ToastAndroid.SHORT);
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

	@action setLiveData(data) {
		var result = {
			data,
			time: moment().locale('tr'),
		};
		AsyncStorage.setItem('liveData', JSON.stringify(data), error => {
			console.log('error', JSON.stringify(error));
			log('setLivedata setItemError');
		});
		this.liveData = data;
	}

	checkData = async () => {
		try {
			var localStorage = AsyncStorage.getItem('liveData');
			if (localStorage) {
				//console.log('if locastorage', localStorage);
				var parsedData = JSON.parse(localStorage);
				var timeDiff = moment(parsedData.time).diff(
					moment().locale('tr'),
					'millisecond',
				);
				if (timeDiff > 1) {
					log('timediff');
					var fetch = await this.fetchData();
					if (!fetch.error) {
						this.setLiveData(fetch);
					} else {
						log('checkData errro fetchdata');
					}
				} else {
					log('timediff false');

					this.liveData = parsedData;
				}
			}
		} catch (e) {
			var fetchData = await this.fetchData();
			if (!fetchData.error) {
				this.setLiveData(fetchData);
			} else {
				log('checkData errro fetchdata');
			}
		}
	};

	syncData = async () => {
		var localData = await AsyncStorage.getItem('liveData');
		if (localData) {
			localData = JSON.parse(localData);
			  var currentDate = moment().tz('Europe/Istanbul').format();
			 // var localdate = moment(localData.date);
			 // var diff = moment(localData.date).diff(currentDate,'minute');

			console.log(currentDate);
			console.log(localData.date);
			console.log(moment(localData.date).format())
		} else {
			console.log('use network data');
			try {
				var response = await this.fetchData();
				await this.setLiveData(response);
			}
			catch (e) {
				log("Error in get web service data");
			}
		}
	};

	@action getLocal = async () => {
		var item = await AsyncStorage.getItem('liveData');
		this.liveData =JSON.parse(item);
	};

	@action setLiveData = async (data) => {
		 await AsyncStorage.setItem('liveData', JSON.stringify(data));
		 this.liveData = JSON.parse(await AsyncStorage.getItem('liveData'));
	};

	@action setClear = async ()=>{
	  await AsyncStorage.removeItem('liveData');
	  this.liveData = {};
  }

  constructor() {
    this.syncData();
	}
}

export default new DataStore();
