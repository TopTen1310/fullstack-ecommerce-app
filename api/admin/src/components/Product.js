import { useDispatch } from 'react-redux'
import { productLoading, deleteProduct } from '../slices/productSlice'
import Loader from './Loader'
import { Link } from 'react-router-dom'

export default function Product({ product, selectedLoading }) {
    const dispatch = useDispatch()

    function deleteAProduct() {
        const productData = {
            productSlug: product.slug,
            imageName: product.imageName
        }
        dispatch(productLoading(product.slug))
        dispatch(deleteProduct(productData))
    }

    return (
        <div className={`productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4 h-fit`}>
            <div className="productImage relative w-full h-80">
                <div className="price absolute top-0 left-0 bg-red-500 text-white text-lg p-2 rounded-lg">
                    $<span className="text-white text-2xl font-medium px-1">{product.price}</span>/-
                </div>
                <img src={product.productImage} alt="" className="object-contain w-full h-80" />
            </div>
            <h3 className="font-semibold text-2xl text-gray-600 text-center pt-4 pb-1 lowercase">{product.title}</h3>
            <div className="categories flex gap-3 justify-center flex-wrap">
                {
                    product.categories.map((category, index) => {
                        if (category && category !== 'all') {
                            return <p key={index} className="font-medium text-xl text-green-500 text-center lowercase">{category}</p>
                        }
                        return null
                    })
                }
            </div>
            {product.description && <p className="font-medium text-xl text-gray-500 text-center mt-2">{product.description}</p>}
            {
                selectedLoading === product.slug ? <Loader mt="mt-5" />
                    : (
                        <div className="flex gap-4 mt-5">
                            <Link to={`/products/${product.slug}`} className="flex-grow w-full">
                                <button className="w-full btn__style bg-yellow-500 py-4 capitalize">update</button>
                            </Link>
                            <button onClick={deleteAProduct} className="flex-grow py-4 w-full bg-red-600 btn__style cursor-pointer capitalize">delete</button>
                        </div>
                    )
            }
        </div>
    )
}
