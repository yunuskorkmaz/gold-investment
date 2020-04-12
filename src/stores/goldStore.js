import {observable} from 'mobx';
import moment from 'moment-timezone';
import {persist} from 'mobx-persist';
export class GoldStore {
  @persist('list') @observable data = [];
  @persist @observable time = '';

  async fetchData() {
    var item = await fetch('https://finans.apipara.com/json/v9/gold', {
      headers: {token: '_magic'},
      method: 'get',
    });
    var response = await item.json();
    this.data = response.response.gold;
    this.time = moment()
      .tz('Europe/Istanbul')
      .format('HH:mm:ss');
  }
}
