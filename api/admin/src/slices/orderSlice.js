import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import services from '../services'

const initialState = {
    orders: [],
    order_success: false,
    order_error: false,
    order_message: '',
    order_loading: false
}

//all orders
export const allOrders = createAsyncThunk(
    'orderSlice/all',
    async (_, thunkAPI) => {
        try {
            return await services.orders(`/order`)
            // return await services.orders(`https://mern-grocery.herokuapp.com/api/order`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//update order
export const updateOrder = createAsyncThunk(
    'orderSlice/update',
    async (orderData, thunkAPI) => {
        try {
            return await services.updateOrder(`/order`, orderData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//delete order
export const deleteOrder = createAsyncThunk(
    'orderSlice/delete',
    async (orderId, thunkAPI) => {
        try {
            return await services.deleteOrder(`/order/${orderId}`)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
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
            .addCase(allOrders.pending, (state) => {
                state.order_loading = true
            })
            .addCase(allOrders.fulfilled, (state, action) => {
                state.order_loading = false
                state.orders = action.payload
            })
            .addCase(allOrders.rejected, (state, action) => {
                state.order_loading = false
                state.order_message = action.payload
            })
            .addCase(updateOrder.fulfilled, (state, action) => {

                state.orders = state.orders.map((order) => {
                    if (order._id === action.payload.orderId) {
                        order.deliveryStatus = action.payload.deliveryStatus
                    }
                    return order
                })
                state.order_success = true
                state.order_message = action.payload.message

            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.order_error = true
                state.order_message = action.payload
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter((order) => (order._id !== action.payload.orderId))
                state.order_success = true
                state.order_message = action.payload.message
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.order_error = true
                state.order_message = action.payload
            })
    }
})

export const { orderReset } = orderSlice.actions
export default orderSlice.reducer