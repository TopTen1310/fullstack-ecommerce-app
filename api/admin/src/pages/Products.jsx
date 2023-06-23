import { useEffect } from 'react'
import SecLayout from '../components/SecLayout'
import SecTitle from '../components/SecTitle'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { toast } from 'react-toastify'
import { productReset, newProduct } from '../slices/productSlice'
import Product from '../components/Product'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'

export default function Products() {
    const { products, product_loading, product_success, product_error, product_message, create_product_loading, selected_product_loading } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.categories)
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (product_success) {
            toast(product_message, { type: 'success', autoClose: 2000 })
            reset()
        }
        if (product_error) toast(product_message, { type: 'error', autoClose: 2000 })
        if (product_success || product_error) dispatch(productReset())
    }, [product_message, product_success, product_error, dispatch, reset, navigate])


    async function createProduct(data) {
        const { title, price, inStock, productImage, description, latest } = data

        const categoriesSlug = categories.map(category => category.slug)
        const selectedCategories = categoriesSlug.filter(slug => (data[slug]))

        if (!productImage[0]) return toast("Product image is required!!!", { type: 'info', autoClose: 2000 })
        if (!selectedCategories.length) return toast("At least one category is required!!!", { type: 'info', autoClose: 2000 })

        const productData = {
            title,
            price,
            inStock,
            description,
            productImage,
            latest,
            categories: [...selectedCategories, 'all']
        }

        dispatch(newProduct(productData))
    }

    return (
        <SecLayout>
            <div className="productForm">

                <SecTitle name="add new product" />

                <form className="reviews mt-6 w-[60rem] max-w-[100%] border-2 border-gray-700 border-solid rounded-lg p-5 mx-auto bg-white" onSubmit={handleSubmit(createProduct)}>
                    <div className="fields grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <input {...register("title", { required: true })} type="text" placeholder="enter product name" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

                        <input {...register("price", { required: true })} type="number" placeholder="enter product price" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

                        <input {...register("inStock", { required: true })} type="number" placeholder="stock" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

                        <input {...register("productImage")} type="file" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-1 text-xl text-gray-800" />

                        <div className="selectCategories sm:col-span-2 flex flex-wrap gap-3 items-center border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800">
                            {
                                categories.map(category => {
                                    return (
                                        <div key={category._id} className="flex gap-1 items-center">
                                            <input type="checkbox" id={category.slug} {...register(category.slug)} />
                                            <label htmlFor={category.slug} className="text-gray-500 font-medium text-xl inline-block select-none"> {category.title}</label>
                                        </div>
                                    )
                                })
                            }
                            <div className="flex gap-1 items-center">
                                <input type="checkbox" id="latest" {...register('latest')} />
                                <label htmlFor="latest" className="text-gray-500 font-medium text-xl inline-block select-none"> Latest</label>
                            </div>
                        </div>

                        <textarea {...register("description")} className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg sm:col-span-2 p-3 text-xl text-gray-800 h-80 resize-none" />

                    </div>

                    {

                        create_product_loading ? <Loader customCss="mb-4" /> :
                            <input type="submit" value="Add Product" className="py-3 w-full bg-green-600 btn__style cursor-pointer mt-4" />
                    }
                </form>

            </div>

            <div className="mt-8">
                <SecTitle name="products added" />
                {product_loading
                    ? <Loader />
                    : products.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                            {
                                products.map(product => (
                                    <Product key={product._id} product={product} selectedLoading={selected_product_loading} />
                                ))
                            }
                        </div>
                    ) : (
                        <Error errMsg="no products yet" />
                    )
                }
            </div>
        </SecLayout>
    )
}
