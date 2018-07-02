import ApiLogin from './apilogin'
import utility from '../utility/Utility'

class AuthenticationService {
  login (params) {
    var self = this
    return new Promise((resolve, reject) => {
      ApiLogin.post('/authen', params)
        .then(function (response) {
          if (utility.isNullOrUndefined(response.data)) {
            reject(response.response.data.message)
          } else {
            // get token from this response
            var token = response.data.token
            self._setAuthToken(token, true)
            resolve(response)
          }
        })
        .catch(function (error) {
          reject(error.response.data.message)
        })
    })
  }

  _setAuthToken (AUTH_TOKEN, deleteIfExists) {
    /* Save to local storage if needed */
    window.localStorage.setItem('token', AUTH_TOKEN)
  }

  refreshToken (params) {
    var self = this
    var data = new window.FormData()
    data.append('refreshToken', params.refreshToken)
    return new Promise((resolve, reject) => {
      ApiLogin.post('/authen/refreshToken', data)
        .then(function (response) {
          // get token from this response
          var token = response.data.token
          self._setAuthToken(token, true)
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  // logout () {
  //   return new Promise((resolve, reject) => {
  //     Api.get('/logout')
  //       .then(function (response) {
  //         if (utility.isNullOrUndefined(response.data)) {
  //           reject(response)
  //         } else {
  //           resolve(response)
  //         }
  //       })
  //       .catch(function (error) {
  //         reject(error)
  //       })
  //   })
  // }
}

export let _AuthenticationService = new AuthenticationService()
