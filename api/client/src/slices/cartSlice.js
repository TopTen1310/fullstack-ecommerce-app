import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../services/cartService'

const initialState = {
    cartItems: [],
    loading: false,
    success: false,
    error: false,
    message: '',
}

//add item in cart
export const addItem = createAsyncThunk(
    'cartList/add',
    async (itemData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await cartService.addInCart(`/cart/${userId}`, itemData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//all products in cart
export const cartProducts = createAsyncThunk(
    'cartList/all',
    async (_, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user?._id
        return await cartService.allItems(`/cart/${userId}`)
    }
)

//delete item from cart
export const deleteItem = createAsyncThunk(
    'cartList/deleteItem',
    async (itemId, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await cartService.deleteItem(`/cart/${userId}/${itemId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//delete item from cart
export const deleteItems = createAsyncThunk(
    'cartList/deleteItems',
    async (_, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await cartService.deleteItems(`/cart/${userId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//update quantity in cart
export const updateQuantity = createAsyncThunk(
    'cartList/update',
    async (itemData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await cartService.updateQuantity(`/cart/${userId}`, itemData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false
            state.success = false
            state.error = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItem.fulfilled, (state, action) => {
                state.cartItems = [...state.cartItems, action.payload]
                state.success = true
                state.message = 'Successfully added in cart'
            })
            .addCase(addItem.rejected, (state, action) => {
                state.error = true
                state.message = action.payload
            })
            .addCase(cartProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(cartProducts.fulfilled, (state, action) => {
                state.loading = false
                state.cartItems = action.payload
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.success = true
                state.message = action.payload.message
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload.cartId)
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.error = true
                state.message = action.payload
            })
            .addCase(deleteItems.fulfilled, (state, action) => {
                state.success = true
                state.message = action.payload.message
                state.cartItems = []
            })
            .addCase(deleteItems.rejected, (state, action) => {
                state.error = true
                state.message = action.payload
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.qtyLoading = false
                state.success = true
                state.message = action.payload.message
                state.cartItems = state.cartItems.map(item => {
                    if (item._id === action.payload.cartId) {
                        item.quantity = action.payload.quantity
                    }
                    return item
                })
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.qtyLoading = false
                state.error = true
                state.message = action.payload
            })
            .addCase('orderSlice/new/fulfilled', (state) => {
                state.cartItems = []
            })
    }
})

export const { resetState } = cartSlice.actions
export default cartSlice.reducer