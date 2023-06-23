import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import services from '../services'

const initialState = {
    users: [],
    users_loading: false,
    selected_users_loading: null,
    users_success: false,
    users_error: false,
    users_message: ''
}

//get all users
export const allUsers = createAsyncThunk(
    'userSlice/all',
    async (_, thunkAPI) => {
        try {
            return await services.allUsers('/user')
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//delete a users
export const deleteUser = createAsyncThunk(
    'userSlice/delete',
    async (userData, thunkAPI) => {
        try {
            return await services.deleteUser(`/user/${userData.userId}`, userData.imageLocation)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersReset: (state) => {
            state.users_error = false
            state.users_message = ''
            state.users_success = false
            state.users_loading = false
        },
        usersLoading: (state, action) => {
            state.selected_users_loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allUsers.pending, (state) => {
                state.users_loading = true
            })
            .addCase(allUsers.fulfilled, (state, action) => {
                state.users_loading = false
                state.users = action.payload
            })
            .addCase(allUsers.rejected, (state, action) => {
                state.users_loading = false
                state.users_error = action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload.id)
                state.users_success = true
                state.users_message = action.payload.message
                state.selected_users_loading = null
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.users_error = true
                state.users_message = action.payload
                state.selected_users_loading = null
            })
    }
})

export const { usersReset, usersLoading } = userSlice.actions
export default userSlice.reducer