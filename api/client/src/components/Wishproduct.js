import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { EyeIcon, XIcon } from '@heroicons/react/solid'
import { deleteWishProduct } from '../slices/wishSlice'
import { Link } from 'react-router-dom'

export default function Wishproduct({ wishProduct, addToCart }) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    function deleteProduct(wishProductId) {
        dispatch(deleteWishProduct(wishProductId))
    }

    return (
        <div className="productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[35rem] max-w-[100%]">
            <div className="productImage relative w-full h-80">
                <button onClick={() => deleteProduct(wishProduct._id)} className="absolute group top-0 left-0 bg-red-500 py-2 px-4 rounded-lg cursor-pointer z-10 hover:bg-gray-700">
                    <XIcon className="w-7 h-7 fill-white" />
                </button>
                <Link to={`/shop/${wishProduct.productSlug}`}>
                    <button className="view absolute group top-0 right-0 bg-white py-2 px-4 rounded-lg border-2 border-solid border-gray-800 hover:bg-gray-800 cursor-pointer z-10">
                        <EyeIcon className="w-7 h-7 fill-gray-700 group-hover:fill-white" />
                    </button>
                </Link>
                <img src={wishProduct.productImage} alt="" className="object-contain w-full h-80" />
            </div>
            <h3 className="font-semibold text-2xl text-gray-600 text-center py-4 lowercase">{wishProduct.productName}</h3>
            <p className="price text-red-500 font-medium text-3xl pb-6 text-center">${wishProduct.productPrice}/ -</p>
            <input onChange={e => setQuantity(e.target.value)} type="number" className="w-full border-2 border-solid border-gray-800 rounded-lg p-3 text-xl text-gray-700 font-medium mb-4" min="1" defaultValue="1" />
            <button className="w-full bg-green-500 btn__style capitalize" onClick={() => addToCart(wishProduct.productName, wishProduct.productPrice, wishProduct.productImage, wishProduct.productSlug, quantity, wishProduct.inStock)}>add to cart</button>
        </div>
    )
}
