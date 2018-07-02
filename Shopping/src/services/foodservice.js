import Api from './api'
import { _FoodList } from '../models/foodmodel'
// import utility from '../utility/Utility'

class FoodService {
  getAllFood () {
    return new Promise((resolve, reject) => {
      Api.get('/food/all')
        .then(function (response) {
          let items = new _FoodList(response.data).items
          resolve(items)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  addFood (obj) {
    return new Promise((resolve, reject) => {
      Api.post('/food/add', obj)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  updateFood (obj) {
    return new Promise((resolve, reject) => {
      Api.post('/food/update', obj)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  removeFood (id) {
    return new Promise((resolve, reject) => {
      Api.post('/food/remove/' + id)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}

export let _FoodService = new FoodService()
