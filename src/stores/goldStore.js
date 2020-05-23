import {observable} from 'mobx';
import moment from 'moment-timezone';
import {persist} from 'mobx-persist';
export class GoldStore {
  @persist('list') @observable data = [];
  @persist @observable time = '';

  @persist('list') @observable investments = [];

  @observable totalValue = 0;
  @observable totalGain = 0;
  @observable totalPrice = 0;
  @observable totalPercentGain = 0;

  addInvestment(data) {
    data.id = this.uuidv4();
    this.investments.push(data);
    this.calculateGain();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  deleteInvestment(id) {
    this.investments = this.investments.filter(item => item.id !== id);
    this.calculateGain();
  }

  calculateGain() {
    var totalValue = 0.0;
    var totalGain = 0;
    var totalPrice = 0;
    this.investments.map(item => {
      var gold = this.data.filter(g => g.code === item.code)[0];
      totalValue += item.count * gold.selling;
      totalPrice += item.count * item.price;
      var diff = parseFloat(gold.selling) - parseFloat(item.price);
      totalGain += item.count * diff;
    });
    this.totalValue = totalValue;
    this.totalGain = totalGain;
    this.totalPrice = totalPrice;
    this.totalPercentGain = (
      Math.abs((totalGain * 100) / totalPrice) || 0
    ).toFixed(2);
  }

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
    this.calculateGain();
  }
}
