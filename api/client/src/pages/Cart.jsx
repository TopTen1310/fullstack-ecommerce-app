import { Link } from 'react-router-dom'
import SecTitle from '../components/SecTitle'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import { useEffect } from 'react'
import { resetState, deleteItems } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Error from '../components/Error'

export default function Cart() {
    const { cartItems, loading, success, error, message } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0)

    useEffect(() => {
        if (success) toast(message, { type: 'success', autoClose: 2000 })
        if (error) toast(message, { type: 'error', autoClose: 2000 })
        if (success || error) dispatch(resetState())
    }, [success, error, message, dispatch])

    function clearCart() {
        dispatch(deleteItems())
    }

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="products added" />
                {loading
                    ? <Loader />
                    : cartItems.length ? (
                        <div className="flex flex-wrap justify-center gap-10 mt-6">
                            {cartItems.map(item => (
                                <CartProduct key={item._id} product={item} />
                            ))}
                        </div>

                    ) : (
                        <Error errMsg="your cart is empty" />
                    )}

                <div className="grand-price bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[38rem] max-w-[100%] mx-auto mt-7">
                    <div className="total text-gray-600 font-medium text-3xl text-center">
                        grand total :
                        <span className="text-red-500"> ${totalPrice}/ -</span>
                    </div>
                    <Link to="/shop">
                        <button className="w-full bg-yellow-500 btn__style capitalize mt-4">continue shopping</button>
                    </Link>
                    <button className={`w-full btn__style capitalize mt-4 ${cartItems.length ? 'bg-red-500' : 'bg-red-300 pointer-events-none'}`} onClick={clearCart}>delete all</button>
                    <Link to="/checkout" className={`${!cartItems.length && 'pointer-events-none'}`}>
                        <button className={`w-full btn__style capitalize mt-4 ${cartItems.length ? 'bg-green-500' : 'bg-green-300'}`}>proceed to checkout</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
