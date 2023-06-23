import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addItem, resetState } from '../slices/cartSlice'

export function useCart() {
    const dispatch = useDispatch()
    const { message, success, error } = useSelector(state => state.cart)

    useEffect(() => {
        if (success) toast(message, { type: 'success', autoClose: 2000 })
        if (error) toast(message, { type: 'error', autoClose: 2000 })
        if (success || error) dispatch(resetState())
    }, [message, success, error, dispatch])

    function addToCart(productName, productPrice, productImage, productSlug, quantity, inStock) {
        if (quantity <= 0) return toast('Your quantity must be at least 1', { type: 'error', autoClose: 2000 })
        if (quantity > inStock) return toast(`Out of stock. Total in stock: ${inStock}`, { type: 'warning', autoClose: 2000 })
        dispatch(addItem({ productName, productPrice, productImage, productSlug, quantity, inStock }))
    }

    return { addToCart }
}