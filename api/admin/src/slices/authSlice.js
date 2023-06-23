import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import service from '../services'
import Cookies from 'js-cookie'

const cookieValue = Cookies.get('clientData') ? JSON.parse(Cookies.get('clientData')) : null

const initialState = {
    user: cookieValue,
    message: '',
    loading: false,
    success: false,
    error: false
}

//login admin
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await service.loginService(user)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//logout admin
export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        return await service.logoutService()
    }
)

//update admin
export const updateUser = createAsyncThunk(
    'auth/update',
    async (userData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await service.updateUser(`/user/${userId}`, userData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            state.message = ''
            state.loading = false
            state.success = false
            state.error = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.success = true
                state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.message = action.payload
                state.error = true
                state.loading = false
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.message = "Successfully updated your profile"
                state.success = true
                state.loading = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.message = action.payload
                state.error = true
                state.loading = false
            })
    }
})

export const { resetState } = authSlice.actions
export default authSlice.reducer
