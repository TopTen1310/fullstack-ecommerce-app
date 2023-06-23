import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import SecTitle from '../components/SecTitle'
import Error from '../components/Error'

export default function Order() {
    const { orders, order_loading } = useSelector(state => state.order)

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="placed orders" />

                {
                    order_loading ? <Loader />
                        : orders.length ? (
                            <div className="allOrders flex gap-6 flex-wrap my-6">
                                {
                                    orders.map(order => (
                                        <div key={order._id} className="order w-[50rem] max-w-[100%] flex-grow bg-white border-2 border-gray-700 border-solid rounded-lg py-4 px-3">
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
                                                payment method:
                                                <span className="text-green-500"> {order.method}</span>
                                            </p>
                                            <p className="text-gray-500 text-xl font-medium mb-3">
                                                your orders:
                                                <span className="text-green-500"> {order.orders}</span>
                                            </p>
                                            <p className="text-gray-500 text-xl font-medium mb-3">
                                                total price:
                                                <span className="text-green-500"> ${order.totalPrice}/-</span>
                                            </p>
                                            <p className="text-gray-500 text-xl font-medium">
                                                delivery status:
                                                <span className={`${order.deliveryStatus === 'Pending' ? 'text-orange-500' : order.deliveryStatus === 'Fulfilled' ? 'text-green-600' : 'text-red-500'}`}>
                                                    {` ${order.deliveryStatus}`}
                                                </span>
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (<Error errMsg="no orders yet" />)
                }

            </div>
        </section>
    )
}
