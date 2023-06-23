import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/Error'
import Loader from '../components/Loader'
import QuickView from '../components/QuickView'
import SecLayout from '../components/SecLayout'
import SecTitle from '../components/SecTitle'
import { productReset } from '../slices/productSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Update() {
    const { slug } = useParams()
    const { products, product_loading, selected_product_loading, product_success, product_error, product_message, currentSlug } = useSelector(state => state.product)
    const selectedProduct = products.find(product => product.slug === slug)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (product_success) {
            toast(product_message, { type: 'success', autoClose: 2000 })
            navigate(`/products/${currentSlug}`)
        }
        if (product_error) toast(product_message, { type: 'error', autoClose: 2000 })
        if (product_success || product_error) dispatch(productReset())
    }, [product_message, product_success, product_error, dispatch])

    return (
        <>
            {
                product_loading ? <Loader />
                    : selectedProduct ? (
                        <SecLayout>
                            <SecTitle name="update product" />
                            <QuickView selectedProduct={selectedProduct} selectedLoading={selected_product_loading} />
                        </SecLayout>
                    )
                        : (
                            <Error errMsg="no product found" />
                        )
            }
        </>
    )
}
