import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../services/productService'


const initialState = {
    products: [],
    loading: false
}

//get all products
export const allProducts = createAsyncThunk(
    'products/all',
    async () => {
        return await productService.allProducts('/product/')
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(allProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
    }
})

export default productSlice.reducer