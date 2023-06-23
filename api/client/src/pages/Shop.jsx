import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWishlist } from '../hooks/wishlist'
import SecTitle from '../components/SecTitle'
import Loader from '../components/Loader'
import { setCurrentCategory } from '../slices/categorySlice'
import { useCart } from '../hooks/cart'
import Food from '../components/Food'

export default function Shop() {
    const { products, loading } = useSelector(state => state.products)
    const { categories, currentCategory } = useSelector(state => state.categories)
    const [active, setActive] = useState(currentCategory)
    const { wishlist } = useWishlist()
    const { addToCart } = useCart()
    const dispatch = useDispatch()

    function selectCat(slug) {
        dispatch(setCurrentCategory(slug))
        setActive(slug)
    }

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">

                <div className="categories">
                    <div className="products grid grid-cols-3 sm:grid-cols-5 gap-6 mb-10">
                        <button onClick={() => selectCat('all')} className={`${active === 'all' ? 'bg-gray-700 text-white' : 'bg-white text-gray-600'} border-2 border-gray-800 border-solid rounded-lg py-4 text-center hover:bg-gray-700 hover:text-white text-xl font-semibold`}>
                            All
                        </button>
                        {
                            categories.map(category => (
                                <button onClick={() => selectCat(category.slug)} key={category._id} className={`${active === category.slug ? 'bg-gray-700 text-white' : 'bg-white text-gray-600'} border-2 border-gray-800 border-solid rounded-lg py-4 text-center hover:bg-gray-700 hover:text-white text-xl font-semibold`}>
                                    {category.title}
                                </button>
                            ))
                        }
                    </div>
                </div>

                <SecTitle name="all products" />
                {loading
                    ? <Loader />
                    : (
                        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                            {products.map(product => {
                                if (product.categories.includes(currentCategory)) {
                                    return <Food key={product._id} product={product} wishlist={wishlist} addToCart={addToCart} />
                                }
                            })}
                        </div>
                    )
                }
            </div>
        </section>
    )
}
