import axios from 'axios'

const API_URL = 'https://che.vti.com.vn/api/'

const ApiLogin = axios.create({
  baseURL: API_URL
})
export default ApiLogin
