var FoodModel = require('./foodmodel')
var moment = require('moment')

class Order {
  constructor(raw) {
    if (raw === null || raw === undefined) {
      raw = {}
    }
    for (let key in raw) {
      for (let miniKey in raw[key]) {
        this[key] = raw[key][miniKey] ? raw[key][miniKey] : null
      }
    }
    if (!this.paid) this.paid = false
    let items = []
    this.items.forEach(element => {
      items.push(new FoodModel.Food(element.M))
    });
    this.items = items
  }
}

module.exports.Order = Order

class OrderList {
  constructor(raw) {
    if (raw === null || raw === undefined) {
      raw = []
    }
    let items = []
    for (let i = 0, l = raw.length; i < l; i++) {
      items.push(new Order(raw[i]))
    }
    this.items = items
    this.items.sort(function(a, b){return moment(a.time).valueOf() - moment(b.time).valueOf()});
  }
}

module.exports.OrderList = OrderList

class OrderListToday {
  constructor (raw) {
    if (raw === null || raw === undefined) {
      raw = []
    }
    let items = new OrderList(raw).items
    let today = moment().format("MMMM Do YYYY");
    this.items = items.filter(item => moment(item.time).format("MMMM Do YYYY") === today)
  }
}

module.exports.OrderListToday = OrderListToday