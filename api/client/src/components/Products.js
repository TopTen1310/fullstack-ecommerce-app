import SecTitle from './SecTitle'
import Loader from './Loader'
import { useSelector } from 'react-redux'
import Food from './Food'
import { useWishlist } from '../hooks/wishlist'
import { useCart } from '../hooks/cart'

export default function Products() {
    const { products, loading } = useSelector(state => state.products)
    const { wishlist } = useWishlist()
    const { addToCart } = useCart()

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="latest products" />
                {loading
                    ? <Loader />
                    : (
                        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-6">
                            {products.map(product => {
                                if (product.latest) {
                                    return <Food key={product._id} product={product} wishlist={wishlist} addToCart={addToCart} />
                                }
                            })}
                        </div>

                    )}
            </div>
        </section>
    )
}
