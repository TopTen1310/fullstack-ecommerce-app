import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import wishService from '../services/wishService'

const initialState = {
    wishlist: [],
    message: '',
    success: false,
    error: false,
    loading: false
}

//add product in wishlist
export const addInWishlist = createAsyncThunk(
    'wishlist/add',
    async (productData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await wishService.addToWishlist(`/wishlist/${userId}`, productData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//all products in wishlist
export const wishProducts = createAsyncThunk(
    'wishlist/get',
    async (_, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user?._id
        return await wishService.ProductsFromWishlist(`/wishlist/${userId}`)
    }
)

//delete product from wishlist
export const deleteWishProduct = createAsyncThunk(
    'wishlist/delete',
    async (id, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await wishService.deleteProductFromWishlist(`/wishlist/${userId}/${id}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//clear wishlist
export const deleteWishProducts = createAsyncThunk(
    'wishlist/deleteAll',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await wishService.clearWishlist(`/wishlist/${userId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const wishSlice = createSlice({
    name: 'wish',
    initialState,
    reducers: {
        resetState: (state) => {
            state.message = ''
            state.success = false
            state.error = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addInWishlist.fulfilled, (state, action) => {
                state.message = 'Successfully added to wishlist'
                state.success = true
                state.wishlist = [...state.wishlist, action.payload]
            })
            .addCase(addInWishlist.rejected, (state, action) => {
                state.message = action.payload
                state.error = true
            })
            .addCase(wishProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(wishProducts.fulfilled, (state, action) => {
                state.loading = false
                state.wishlist = action.payload
            })
            .addCase(deleteWishProduct.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.filter(wish => wish._id !== action.payload.wishId)
                state.success = true
                state.message = action.payload.message
            })
            .addCase(deleteWishProduct.rejected, (state, action) => {
                state.error = true
                state.message = action.payload
            })
            .addCase(deleteWishProducts.fulfilled, (state, action) => {
                state.wishlist = []
                state.success = true
                state.message = action.payload.message
            })
            .addCase(deleteWishProducts.rejected, (state, action) => {
                state.error = true
                state.message = action.payload
            })
            .addCase('cartList/add/fulfilled', (state, action) => {
                state.wishlist = state.wishlist.filter(wish => wish.productSlug !== action.payload.productSlug)
            })
    }
})

export const { resetState } = wishSlice.actions
export default wishSlice.reducer