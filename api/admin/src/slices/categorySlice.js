import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import services from '../services'

const initialState = {
    categories: [],
    category_message: ''
}

//get all categories
export const allCategories = createAsyncThunk(
    'categories/all',
    async (_, thunkAPI) => {
        try {
            return await services.allCategories('/category/')
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(allCategories.rejected, (state, action) => {
                state.category_message = action.payload
            })
    }
})

export default categorySlice.reducer