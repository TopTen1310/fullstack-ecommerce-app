import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addInWishlist, resetState } from '../slices/wishSlice'
import { toast } from 'react-toastify'

export function useWishlist() {
    const { message, success, error } = useSelector(state => state.wishList)
    const dispatch = useDispatch()

    useEffect(() => {
        if (success) toast(message, { type: 'success', autoClose: 2000 })
        if (error) toast(message, { type: 'error', autoClose: 2000 })
        if (success || error) dispatch(resetState())
    }, [message, success, error, dispatch])

    function wishlist(productSlug, productImage, productPrice, productName, inStock) {
        dispatch(addInWishlist({ productSlug, productImage, productPrice, productName, inStock }))
    }

    return { wishlist }
}