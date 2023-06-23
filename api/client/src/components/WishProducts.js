import { useEffect } from 'react'
import SecTitle from './SecTitle'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { deleteWishProducts, resetState } from '../slices/wishSlice'
import { toast } from 'react-toastify'
import Error from './Error'
import { useCart } from '../hooks/cart'
import Wishproduct from './Wishproduct'

export default function WishProducts() {
    const { wishlist, loading, success, message, error } = useSelector(state => state.wishList)
    const dispatch = useDispatch()
    const { addToCart } = useCart()

    const totalPrice = wishlist.reduce((acc, item) => acc + item.productPrice, 0)

    useEffect(() => {
        if (success) toast(message, { type: 'success', autoClose: 2000 })
        if (error) toast(message, { type: 'error', autoClose: 2000 })
        if (success || error) dispatch(resetState())
    }, [success, message, error, dispatch])

    function clearWishlist() {
        dispatch(deleteWishProducts())
    }

    return (
        <section className="p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="products added" />
                {loading
                    ? <Loader />
                    : wishlist.length ? (
                        <div className="flex flex-wrap justify-center gap-10 mt-6">
                            {
                                wishlist.map(wishProduct => (
                                    <Wishproduct key={wishProduct._id} wishProduct={wishProduct} addToCart={addToCart} />
                                ))
                            }
                        </div>
                    ) : (
                        <Error errMsg="your wishlist is empty" />
                    )
                }

                <div className="grand-price bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[38rem] max-w-[100%] mx-auto mt-7">
                    <div className="total text-gray-600 font-medium text-3xl text-center">
                        grand total :
                        <span className="text-red-500"> ${totalPrice}/ -</span>
                    </div>
                    <Link to="/shop">
                        <button className="w-full bg-yellow-500 btn__style capitalize mt-4">continue shopping</button>
                    </Link>
                    <button className={`w-full btn__style capitalize mt-4 ${wishlist.length ? 'bg-red-500' : 'bg-red-300 pointer-events-none'}`} onClick={clearWishlist}>delete all</button>
                </div>
            </div>
        </section>
    )
}
