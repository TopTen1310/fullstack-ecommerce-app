import { useDispatch } from 'react-redux'
import { deleteUser, usersLoading } from '../slices/userSlice'
import Loader from './Loader'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function User({ user, selectedLoading }) {
    const dispatch = useDispatch()

    async function deleteUserAcc() {
        const userData = {
            userId: user._id,
            imageLocation: user.imageName
        }
        dispatch(usersLoading(user._id))
        dispatch(deleteUser(userData))
    }

    return (
        <div className="border-2 border-gray-800 border-solid rounded-lg p-6 w-[30rem] max-w-[100%] bg-white text-center">
            <img src={user.image ? user.image : defaultImage} alt="" className="w-44 h-44 rounded-full mx-auto object-cover mb-4" />
            <p className="text-gray-500 text-xl font-medium mb-3">
                user id:
                <span className="text-green-500"> {user._id}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                username:
                <span className="text-green-500"> {user.name}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                email:
                <span className="text-green-500"> {user.email}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                user type:
                <span className="text-green-500"> {user.isAdmin ? 'admin' : 'user'}</span>
            </p>
            {selectedLoading === user._id ? <Loader mt="mt-2" customCss="mb-3" />
                : (
                    <button onClick={deleteUserAcc} className="flex-grow py-4 w-full bg-orange-600 btn__style cursor-pointer capitalize">delete</button>
                )
            }
        </div>
    )
}
