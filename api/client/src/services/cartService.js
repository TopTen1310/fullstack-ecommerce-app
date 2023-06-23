import axios from "../axiosConfig"

async function addInCart(url, data) {
  const res = await axios.post(url, data)
  return res.data
}

async function allItems(url) {
  const res = await axios.get(url)
  return res.data
}

async function deleteItem(url) {
  const res = await axios.delete(url)
  return res.data
}

async function deleteItems(url) {
  const res = await axios.delete(url)
  return res.data
}

async function updateQuantity(url, data) {
  const res = await axios.put(url, data)
  return res.data
}

const cartService = {
  addInCart,
  allItems,
  deleteItem,
  updateQuantity,
  deleteItems,
}
export default cartService
