import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { useWishlist } from '../hooks/wishlist'
import SecTitle from '../components/SecTitle'
import Error from '../components/Error'
import { useCart } from '../hooks/cart'
import { useSelector } from 'react-redux'

export default function Product() {
    const { slug } = useParams()
    const { products, loading } = useSelector(state => state.products)
    const product = products.find(item => item.slug === slug)
    const { wishlist } = useWishlist()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="quick view" />
                {loading
                    ? <Loader />
                    : product ? (
                        <div className="productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[38rem] max-w-[100%] mx-auto mt-6">
                            <div className="productImage relative w-full h-80">
                                <div className="price absolute top-0 left-0 bg-red-500 text-white text-lg p-2 rounded-lg">
                                    $<span className="text-white text-2xl font-medium px-1">{product.price}</span>/-
                                </div>
                                <img src={product.productImage} alt="" className="object-contain w-full h-80" />
                            </div>
                            <h3 className="font-semibold text-2xl text-gray-600 text-center py-4 lowercase">{product.title}</h3>
                            {product.description &&
                                <p className="mb-4 mt-2 text-lg text-gray-400 font-semibold text-center leading-loose">{product.description}</p>
                            }
                            <input type="number" onChange={e => setQuantity(e.target.value)} className="w-full border-2 border-solid border-gray-800 rounded-lg p-3 text-xl text-gray-700 font-medium" min="1" max={product.inStock} defaultValue="1" />
                            <button className="w-full bg-yellow-500 btn__style mt-4 mb-3 capitalize" onClick={() => wishlist(product.slug, product.productImage, product.price, product.title, product.inStock)}>add to wishlist</button>
                            <button className="w-full bg-green-500 btn__style capitalize" onClick={() => addToCart(product.title, product.price, product.productImage, product.slug, quantity, product.inStock)}>add to cart</button>
                        </div>
                    ) : (
                        <Error errMsg="product not found" />
                    )
                }
            </div>
        </section>
    )
}
