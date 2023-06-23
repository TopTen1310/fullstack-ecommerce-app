import axios from "../axiosConfig"

async function addToWishlist(url, productData) {
  const res = await axios.post(url, productData)
  return res.data
}

async function ProductsFromWishlist(url) {
  const res = await axios.get(url)
  return res.data
}

async function deleteProductFromWishlist(url) {
  const res = await axios.delete(url)
  return res.data
}

async function clearWishlist(url) {
  const res = await axios.delete(url)
  return res.data
}

const wishService = {
  addToWishlist,
  ProductsFromWishlist,
  deleteProductFromWishlist,
  clearWishlist,
}
export default wishService
