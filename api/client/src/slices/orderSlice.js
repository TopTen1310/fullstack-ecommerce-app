import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from '../services/orderService'

const initialState = {
    orders: [],
    order_success: false,
    order_error: false,
    order_message: '',
    order_loading: false
}

//create new order
export const newOrder = createAsyncThunk(
    'orderSlice/new',
    async (orderData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await orderService.createOrder(`/order/${userId}`, orderData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//all orders
export const allOrders = createAsyncThunk(
    'orderSlice/all',
    async (_, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user?._id
        return await orderService.orders(`/order/${userId}`)
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderReset: (state) => {
            state.order_error = false
            state.order_success = false
            state.order_message = ''
            state.order_loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(newOrder.fulfilled, (state, action) => {
                state.order_message = 'Successfully ordered'
                state.order_success = true
                state.orders = [action.payload, ...state.orders]
            })
            .addCase(newOrder.rejected, (state, action) => {
                state.order_message = action.payload
                state.order_error = true
            })
            .addCase(allOrders.pending, (state) => {
                state.order_loading = true
            })
            .addCase(allOrders.fulfilled, (state, action) => {
                state.order_loading = false
                state.orders = action.payload
            })
    }
})

export const { orderReset } = orderSlice.actions
export default orderSlice.reducer