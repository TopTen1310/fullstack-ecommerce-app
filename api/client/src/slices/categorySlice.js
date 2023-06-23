import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from '../services/categoryService'


const initialState = {
    categories: [],
    currentCategory: 'all',
    loading: false
}

//get all categories
export const allCategories = createAsyncThunk(
    'categories/all',
    async () => {
        return await categoryService.allCategories('/category/')
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(allCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
    }
})

export const { setCurrentCategory } = categorySlice.actions
export default categorySlice.reducer