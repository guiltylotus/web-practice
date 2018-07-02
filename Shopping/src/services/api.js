import axios from 'axios'

const API_URL = 'https://apitestexpress.herokuapp.com/'
// const API_URL = 'http://localhost:3000/'

const Api = axios.create({
  baseURL: API_URL
})
export default Api
