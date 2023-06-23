import SecTitle from './SecTitle'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCategory } from '../slices/categorySlice'

export default function Cats() {
    const { categories, loading } = useSelector(state => state.categories)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function setCategory(slug) {
        dispatch(setCurrentCategory(slug))
        navigate('/shop')
    }

    return (
        <section className="section p-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="shop by category" />
                {
                    loading
                        ? <Loader />
                        : (
                            <div className="categories grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
                                {categories.map(category => (
                                    <div key={category._id} className="catBox bg-white border-2 border-gray-800 border-solid rounded-lg p-6">
                                        <img src={category.image} alt="" className="catImage object-contain w-full h-80" />
                                        <h1 className="text-center text-2xl text-gray-700 font-semibold uppercase py-6">{category.title}</h1>
                                        <p className="text-center text-xl text-gray-500 font-medium leading-normal">{category.description}</p>
                                        <div onClick={() => setCategory(category.slug)} className="text-center">
                                            <button className="bg-green-500 btn__style px-6 mt-4">{category.title}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                }
            </div>
        </section>
    )
}
