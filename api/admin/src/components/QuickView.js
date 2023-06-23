import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { productLoading, updateProduct } from '../slices/productSlice'

export default function QuickView({ selectedProduct, selectedLoading }) {
    const { register, handleSubmit } = useForm();
    const { categories } = useSelector(state => state.categories)
    const dispatch = useDispatch()

    function updateAProduct(data) {
        const { title, price, inStock, productImage, description, latest } = data

        const categoriesSlug = categories.map(category => category.slug)
        const selectedCategories = categoriesSlug.filter(slug => (data[slug]))

        const productData = {
            title, price, inStock, productImage, description, latest,
            categories: [...selectedCategories, 'all'],
            productSlug: selectedProduct.slug,
            imageName: selectedProduct.imageName
        }
        dispatch(productLoading(selectedProduct.slug))
        dispatch(updateProduct(productData))
    }

    return (
        <form className="reviews mt-6 w-[50rem] max-w-[100%] border-2 border-gray-700 border-solid rounded-lg p-5 mx-auto bg-white" onSubmit={handleSubmit(updateAProduct)}>
            <img src={selectedProduct.productImage} alt="" className="object-contain w-full h-80" />
            <input {...register("title", { required: true })} type="text" defaultValue={selectedProduct.title} placeholder="enter product name" className="mt-4 border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
            <input {...register("price", { required: true })} type="number" defaultValue={selectedProduct.price} placeholder="enter product price" className="mt-4 border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
            <input {...register("inStock", { required: true })} type="number" defaultValue={selectedProduct.inStock} placeholder="stock" className="mt-4 border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

            <div className="selectCategories mt-4 flex flex-wrap gap-3 items-center border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800">
                {
                    categories.map(category => {
                        return (
                            <div key={category._id} className="flex gap-1 items-center">
                                <input type="checkbox" id={category.slug} {...register(category.slug)} defaultChecked={selectedProduct.categories.includes(category.slug) ? true : false} />
                                <label htmlFor={category.slug} className="text-gray-500 font-medium text-xl inline-block select-none"> {category.title}</label>
                            </div>
                        )
                    })
                }
                <div className="flex gap-1 items-center">
                    <input type="checkbox" id="latest" {...register('latest')} defaultChecked={selectedProduct.latest ? true : false} />
                    <label htmlFor="latest" className="text-gray-500 font-medium text-xl inline-block select-none"> Latest</label>
                </div>
            </div>

            <textarea {...register("description")} defaultValue={selectedProduct.description} className="mt-4 border-gray-800 border-solid bg-gray-100 border-2 rounded-lg p-3 text-xl text-gray-800 h-80 resize-none w-full" />
            <input {...register("productImage")} type="file" className="mt-4 border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

            {
                selectedLoading === selectedProduct.slug ? <Loader mt="mt-4" />
                    : (
                        <div className="flex flex-col sm:flex-row gap-4 mt-5">
                            <button className="flex-grow py-4 w-full bg-green-600 btn__style cursor-pointer capitalize">update product</button>
                            <Link to="/products" className="flex-grow w-full">
                                <button className="w-full btn__style bg-yellow-500 py-4 capitalize">go back</button>
                            </Link>
                        </div>
                    )
            }
        </form>
    )
}
