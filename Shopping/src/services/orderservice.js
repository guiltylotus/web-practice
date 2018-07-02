import Api from './api'
// import { _FoodList } from '../models/foodmodel'
// import utility from '../utility/Utility'

class OrderService {
  addNewOrder (item) {
    return new Promise((resolve, reject) => {
      Api.post('/order/add', item)
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  getOrderByAccount (account) {
    return new Promise((resolve, reject) => {
      Api.get('/order/list/' + account)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  getAllOrder () {
    return new Promise((resolve, reject) => {
      Api.get('/order/all')
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  getAllOrderToday () {
    return new Promise((resolve, reject) => {
      Api.get('/order/today')
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  markOrderAsPaid (account, id) {
    return new Promise((resolve, reject) => {
      Api.post('/order/update/', {
        account: account,
        id: id
      })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}

export let _OrderService = new OrderService()
