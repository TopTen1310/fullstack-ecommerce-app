import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EyeIcon } from '@heroicons/react/solid'

export default function Food({ product, addToCart, wishlist, customStyle }) {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className={`productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4 ${customStyle && customStyle}`}>
            <div className="productImage relative w-full h-80">
                <div className="price absolute top-0 left-0 bg-red-500 text-white text-lg p-2 rounded-lg">
                    $<span className="text-white text-2xl font-medium px-1">{product.price}</span>/-
                </div>
                <Link to={`/shop/${product.slug}`}>
                    <button className="view absolute group top-0 right-0 bg-white py-2 px-4 rounded-lg border-2 border-solid border-gray-800 hover:bg-gray-800 cursor-pointer z-10">
                        <EyeIcon className="w-7 h-7 fill-gray-700 group-hover:fill-white" />
                    </button>
                </Link>
                <img src={product.productImage} alt="" className="object-contain w-full h-80" />
            </div>
            <h3 className="font-semibold text-2xl text-gray-600 text-center py-4 lowercase">{product.title}</h3>
            <input onChange={e => setQuantity(e.target.value)} type="number" className="w-full border-2 border-solid border-gray-800 rounded-lg p-3 text-xl text-gray-700 font-medium" min="1" max={product.inStock} defaultValue="1" />
            <button className="w-full bg-yellow-500 btn__style mt-4 mb-3 capitalize" onClick={() => wishlist(product.slug, product.productImage, product.price, product.title, product.inStock)}>add to wishlist</button>
            <button className="w-full bg-green-500 btn__style capitalize" onClick={() => addToCart(product.title, product.price, product.productImage, product.slug, quantity, product.inStock)}>add to cart</button>
        </div>
    )
}
