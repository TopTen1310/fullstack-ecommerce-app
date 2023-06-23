import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import InputErr from "../components/InputErr"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import axios from "../axiosConfig"
import Loader from "../components/Loader"
import { useNavigate } from "react-router-dom"
import uploadImage from "../utils/uploadImg"
import { v1 } from "uuid"

export default function Register({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  async function registerUser(data) {
    const { name, password, email, imageFile, cpassword } = data

    if (password !== cpassword) {
      return toast("Confirm password doesn't match", {
        type: "warning",
        autoClose: 2000,
      })
    }

    setLoading(true)

    try {
      const imageName = v1()
      let imgUrl

      if (imageFile[0]) {
        imgUrl = await uploadImage(imageFile[0], imageName)
      }

      const userData = {
        name,
        password,
        email,
      }

      if (imgUrl) {
        userData.image = imgUrl
        userData.imageName = imageName
      }

      await axios.post("/auth/register", userData)

      setLoading(false)
      reset()
      navigate("/login")
    } catch (err) {
      setLoading(false)
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      toast(message, { type: "error", autoClose: 2000 })
    }
  }

  return (
    <section className="bg-white w-full h-screen flex items-center justify-center p-10">
      <form
        className="w-[40rem] max-w-[100%] border-2 border-gray-700 border-solid rounded-lg p-4"
        onSubmit={handleSubmit(registerUser)}
      >
        <h2 className="text-center text-4xl uppercase text-gray-800 font-semibold pb-5">
          register now
        </h2>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="enter your name"
          className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="enter your email"
          className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800 my-5"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="enter your password"
          className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800"
        />
        <input
          {...register("cpassword", { required: true })}
          type="password"
          placeholder="confirm your password"
          className="my-5 border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800"
        />
        <input
          {...register("imageFile")}
          type="file"
          className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800"
        />
        {loading ? (
          <Loader customCss="my-5" />
        ) : (
          <button className={`w-full btn__style my-5 bg-green-600`}>
            Register Now
          </button>
        )}
        {errors.name && <InputErr msg="Your name" />}
        {errors.email && <InputErr msg="Your mail-address" />}
        {errors.password && <InputErr msg="A password" />}
        {errors.cpassword && <InputErr msg="Confirming password" />}
        <div className="text-gray-600 text-2xl font-normal text-center">
          already have an account?
          <Link to="/login">
            <span className="text-green-600 cursor-pointer hover:underline">
              {" "}
              login now
            </span>
          </Link>
        </div>
      </form>
    </section>
  )
}
