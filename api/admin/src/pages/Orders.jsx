import { useEffect } from 'react'
import SecLayout from '../components/SecLayout'
import SecTitle from '../components/SecTitle'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Order from '../components/Order'
import { toast } from 'react-toastify'
import { orderReset } from '../slices/orderSlice'

export default function Orders() {
    const { orders, order_loading, order_success, order_error, order_message } = useSelector(state => state.order)
    const dispatch = useDispatch()

    useEffect(() => {
        if (order_success) toast(order_message, { type: 'success', autoClose: 2000 })
        if (order_error) toast(order_message, { type: 'error', autoClose: 2000 })
        if (order_success || order_error) dispatch(orderReset())
    }, [order_message, order_success, order_error, dispatch])

    return (
        <SecLayout>
            <SecTitle name="placed orders" />
            {order_loading
                ? <Loader />
                : orders.length ? (
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {
                            orders.map(order => (
                                <Order key={order._id} order={order} />
                            ))
                        }
                    </div>
                ) : (
                    <Error errMsg="no orders placed yet" />
                )
            }
        </SecLayout>
    )
}
