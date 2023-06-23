import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Message from '../components/Message'
import SecLayout from '../components/SecLayout'
import SecTitle from '../components/SecTitle'
import { messageReset } from '../slices/messageSlice'

export default function Messages() {
    const { allMessages, message_loading, message_success, message_error, message } = useSelector(state => state.messages)
    const dispatch = useDispatch()

    useEffect(() => {
        if (message_success) toast(message, { type: 'success', autoClose: 2000 })
        if (message_error) toast(message, { type: 'error', autoClose: 2000 })
        if (message_success || message_error) dispatch(messageReset())
    }, [message, message_success, message_error, dispatch])

    return (
        <SecLayout>
            <SecTitle name="user accounts" />
            {message_loading
                ? <Loader />
                : allMessages.length ? (
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {
                            allMessages.map(message => {
                                return <Message key={message._id} message={message} />
                            })
                        }
                    </div>
                ) : (
                    <Error errMsg="no messages yet" />
                )
            }
        </SecLayout>
    )
}
