import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateOrder, deleteOrder } from '../slices/orderSlice'

export default function Order({ order }) {
    const [status, setStatus] = useState(order.deliveryStatus)
    const dispatch = useDispatch()

    function updateClientsOrder() {
        dispatch(updateOrder({ orderId: order._id, deliveryStatus: status }))
    }

    function deleteClientsOrder() {
        dispatch(deleteOrder(order._id))
    }

    return (
        <div className="order w-[40rem] max-w-[100%] bg-white border-2 border-gray-700 border-solid rounded-lg py-4 px-3">
            <p className="text-gray-500 text-xl font-medium mb-3">
                user id:
                <span className="text-green-500"> {order.userId}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                placed on:
                <span className="text-green-500"> {new Date(order.createdAt).toLocaleDateString()}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                name:
                <span className="text-green-500"> {order.name}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                number:
                <span className="text-green-500"> {order.number}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                email:
                <span className="text-green-500"> {order.email}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                address:
                <span className="text-green-500"> {order.address}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                orders:
                <span className="text-green-500"> {order.orders}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                total price:
                <span className="text-green-500"> ${order.totalPrice}/-</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                payment method:
                <span className="text-green-500"> {order.method}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                payment Id:
                <span className="text-green-500"> {order.paymentInfo.paymentId}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                payment status:
                <span className="text-green-500"> {order.paymentInfo.paymentStatus}</span>
            </p>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border-2 border-gray-800 border-solid text-2xl text-gray-600 rounded-lg font-semibold py-3 px-5">
                <option value="Pending">Pending</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Rejected">Rejected</option>
            </select>

            <div className="flex flex-col sm:flex-row gap-4 mt-5">
                <button onClick={updateClientsOrder} className="flex-grow py-4 w-full bg-yellow-500 btn__style cursor-pointer capitalize">update</button>
                <button onClick={deleteClientsOrder} className="flex-grow py-4 w-full bg-red-600 btn__style cursor-pointer capitalize">delete</button>
            </div>
        </div>
    )
}
