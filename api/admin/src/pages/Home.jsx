import SecLayout from "../components/SecLayout";
import SecTitle from "../components/SecTitle";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Home() {
    const { orders } = useSelector(state => state.order)
    const { users } = useSelector(state => state.user)
    const { allMessages } = useSelector(state => state.messages)
    const { products } = useSelector(state => state.product)

    const pendingAmount = orders.reduce((acc, item) => {
        if (item.deliveryStatus === 'Pending') return item.totalPrice + acc
        return acc
    }, 0)

    const fulfilledAmount = orders.reduce((acc, item) => {
        if (item.deliveryStatus === 'Fulfilled') return item.totalPrice + acc
        return acc
    }, 0)

    const totalUsers = users.reduce((acc, item) => {
        if (item.isAdmin) return acc
        return acc + 1
    }, 0)

    const totalAdmin = users.reduce((acc, item) => {
        if (item.isAdmin) return acc + 1
        return acc
    }, 0)

    return (
        <SecLayout>
            <SecTitle name="dashboard" />
            <div className="pages grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-7">

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">${pendingAmount}/-</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total pending
                    </div>
                    <Link to="/orders">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see orders</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">${fulfilledAmount}/-</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        fulfilled orders
                    </div>
                    <Link to="/orders">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see orders</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">{orders.length}</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        orders placed
                    </div>
                    <Link to="/orders">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see orders</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">{products.length}</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        products added
                    </div>
                    <Link to="/products">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see products</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">{totalUsers}</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total users
                    </div>
                    <Link to="/users">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see accounts</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">{totalAdmin}</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total admins
                    </div>
                    <Link to="/users">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see accounts</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">{users.length}</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total accounts
                    </div>
                    <Link to="/users">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see accounts</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">{allMessages.length}</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total messages
                    </div>
                    <Link to="/messages">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see messages</button>
                    </Link>
                </div>

            </div>
        </SecLayout>
    )
}
