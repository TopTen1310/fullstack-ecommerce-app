import { useDispatch } from 'react-redux'
import { deleteMsg } from '../slices/messageSlice'

export default function Message({ message }) {
    const dispatch = useDispatch()

    function deleteMessage() {
        dispatch(deleteMsg(message._id))
    }

    return (
        <div className="border-2 border-gray-800 border-solid rounded-lg p-6 w-[30rem] max-w-[100%] bg-white">
            <p className="text-gray-500 text-xl font-medium mb-3">
                user id:
                <span className="text-green-500"> {message.userId}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                name:
                <span className="text-green-500"> {message.name}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                email:
                <span className="text-green-500"> {message.email}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                message:
                <span className="text-green-500"> {message.message}</span>
            </p>
            <button onClick={deleteMessage} className="flex-grow py-4 w-full bg-orange-600 btn__style cursor-pointer capitalize">delete</button>
        </div>
    )
}
