import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useWishlist } from '../hooks/wishlist'
import Error from '../components/Error'
import Food from '../components/Food'
import { useCart } from '../hooks/cart'

export default function Search() {
    const { products } = useSelector(state => state.products)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const { wishlist } = useWishlist()
    const { addToCart } = useCart()

    function showProducts(e) {
        e.preventDefault()
        const inputValue = value.toLowerCase()
        const productsToShow = products.filter(product => product.slug.includes(inputValue) || product.title.toLowerCase().includes(inputValue))
        if (productsToShow.length) {
            setFilteredProducts(productsToShow)
            setError('')
        } else {
            setError("Product couldn't found")
            setFilteredProducts([])
        }
    }

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <form className="flex gap-4 items-center max-w-[100%]">
                    <input onChange={e => setValue(e.target.value)} type="text" placeholder="Search products..." className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                    <input onClick={showProducts} type="submit" value="Search" className={`py-4 px-8 btn__style cursor-pointer ${value ? 'bg-green-600' : 'bg-green-400 pointer-events-none'}`} />
                </form>

                <div className="flex flex-wrap justify-center gap-10 mt-6">
                    {
                        error ? (
                            <Error errMsg={error} />
                        ) : (
                            filteredProducts.map(product => (
                                <Food key={product._id} product={product} wishlist={wishlist} addToCart={addToCart} customStyle="w-[32rem]" />
                            ))
                        )

                    }
                </div>
            </div>
        </section>
    )
}
