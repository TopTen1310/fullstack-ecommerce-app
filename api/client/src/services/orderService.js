import axios from "../axiosConfig"

async function createOrder(url, data) {
  const res = await axios.post(url, data)
  return res.data
}

async function orders(url) {
  const res = await axios.get(url)
  return res.data
}

const orderService = { createOrder, orders }
export default orderService
