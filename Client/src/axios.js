import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-shop-flow.vercel.app/api',
  withCredentials: true
})

export default instance