import axios from 'axios'

const API_URL = 'https://apitestexpress.herokuapp.com/'

const Api = axios.create({
  baseURL: API_URL
})
export default Api
