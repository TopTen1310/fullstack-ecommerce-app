import { useEffect } from 'react'
import SecTitle from '../components/SecTitle'
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import InputErr from "../components/InputErr";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { sendMessage, resetState } from '../slices/messageSlice'

export default function Contact() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { message, loading, success, error } = useSelector(state => state.message)
    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            toast(message, { type: 'success', autoClose: 2000 })
            reset()
        }
        if (error) toast(message, { type: 'error', autoClose: 2000 })
        if (success || error) dispatch(resetState())
    }, [message, success, error])

    function send(data) {
        dispatch(sendMessage(data))
    }

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="get in touch" />
                <form className="mt-6 w-[42rem] max-w-[100%] mx-auto bg-white border-2 border-gray-800 border-solid rounded-lg p-5" onSubmit={handleSubmit(send)}>
                    <input {...register("name", { required: true })} type="text" placeholder="enter your name" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                    <input {...register("email", { required: true })} type="email" placeholder="enter your email" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 mt-5" />
                    <input {...register("number", { required: true })} type="number" placeholder="enter your number" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 mt-5" />
                    <textarea {...register("message", { required: true })} placeholder="enter your message" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 mt-5 resize-none h-56" />
                    {errors.name && <InputErr msg="Your name" />}
                    {errors.email && <InputErr msg="Your mail-address" />}
                    {errors.number && <InputErr msg="Your number" />}
                    {errors.message && <InputErr msg="Message" />}
                    {
                        loading
                            ? <Loader customCss="mb-5" /> :
                            <input type="submit" value="Send Message" className="py-4 w-full bg-green-600 btn__style capitalize mt-4 cursor-pointer" />
                    }
                </form>
            </div>
        </section>
    )
}
