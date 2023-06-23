import axios from "../axiosConfig"
import { v1 } from "uuid"
import uploadImage from "../utils/uploadImg"

async function loginService(userData) {
  const { email, pass } = userData
  const res = await axios.post("/auth/login", { email, pass })
  return res.data
}

async function logoutService() {
  const res = await axios.get("/auth/logout")
  return res.data.message
}

async function updateUser(url, userData) {
  let imgUrl
  let imageName

  if (userData.newImage[0]) {
    imageName = userData.imageName ? userData.imageName : v1()
    imgUrl = await uploadImage(userData.newImage[0], imageName)
  }

  const thingsToUpdate = {
    name: userData.name,
    email: userData.email,
    oldPass: userData.oldPass,
    newPass: userData.newPass,
  }

  if (imgUrl) {
    thingsToUpdate.image = imgUrl
    thingsToUpdate.imageName = imageName
  }

  const res = await axios.put(url, thingsToUpdate)
  return res.data
}

const authService = { loginService, logoutService, updateUser }

export default authService
