import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Error from '../components/Error'
import Loader from '../components/Loader'
import SecLayout from '../components/SecLayout'
import SecTitle from '../components/SecTitle'
import User from '../components/User'
import { usersReset } from '../slices/userSlice'

export default function Users() {
    const { users, users_loading, users_success, users_error, users_message, selected_users_loading } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (users_success) toast(users_message, { type: 'success', autoClose: 2000 })
        if (users_error) toast(users_message, { type: 'error', autoClose: 2000 })
        if (users_success || users_error) dispatch(usersReset())
    }, [users_message, users_success, users_error, dispatch])

    return (
        <SecLayout>
            <SecTitle name="user accounts" />
            {users_loading
                ? <Loader />
                : users.filter(user => !user.isAdmin).length ? (
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {
                            users.map(user => {
                                if (!user.isAdmin) return <User key={user._id} user={user} selectedLoading={selected_users_loading} />
                                return null
                            })
                        }
                    </div>
                ) : (
                    <Error errMsg="no users found" />
                )
            }
        </SecLayout>
    )
}
