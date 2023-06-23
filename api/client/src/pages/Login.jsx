import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import InputErr from "../components/InputErr";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login, resetState } from '../slices/authSlice'

export default function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, message, loading, error, success } = useSelector(state => state.auth)

    useEffect(() => {
        if (error) {
            toast(message, { type: 'error', autoClose: 2000 })
        }
        if (success || user) {
            reset()
            navigate('/')
        }
        dispatch(resetState())
    }, [user, message, error, success, dispatch, navigate, reset])

    async function loginUser(data) {
        dispatch(login(data))
    }

    return (
        <section className="bg-white w-full h-screen flex items-center justify-center p-10">
            <form className="w-[40rem] max-w-[100%] border-2 border-gray-700 border-solid rounded-lg p-4" onSubmit={handleSubmit(loginUser)}>
                <h2 className="text-center text-4xl uppercase text-gray-800 font-semibold pb-5">login now</h2>
                <input {...register("email", { required: true })} type="email" placeholder="enter your email" className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                <input {...register("pass", { required: true })} type="password" placeholder="enter your password" className="my-5 border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                {
                    loading
                        ? <Loader customCss="mb-5" /> :
                        <button className={`w-full btn__style mb-5 bg-green-600`}>Login Now</button>
                }
                {errors.email && <InputErr msg="Your mail-address" />}
                {errors.pass && <InputErr msg="Your password" />}
                <div className="text-gray-600 text-2xl font-normal text-center">
                    don't have an account?
                    <Link to="/register">
                        <span className="text-green-600 cursor-pointer hover:underline"> register now</span>
                    </Link>
                </div>
            </form>
        </section>
    )
}
