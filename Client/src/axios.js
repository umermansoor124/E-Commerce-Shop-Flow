import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-shop-flow-yfox.vercel.app/api',
  withCredentials: true
})

export default instance