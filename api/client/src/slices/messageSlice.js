import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from '../services/messageService'

const initialState = {
    message: '',
    loading: false,
    success: false,
    error: false
}

//send message
export const sendMessage = createAsyncThunk(
    'message/send',
    async (msgData, thunkAPI) => {
        try {
            const userId = thunkAPI.getState().auth.user?._id
            return await messageService.sendMessage(`/message/${userId}`, msgData)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const messageSlice = createSlice({
    name: 'message',
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
            .addCase(sendMessage.pending, (state) => {
                state.loading = true
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false
                state.message = action.payload.message
                state.success = true
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false
                state.message = action.payload
                state.error = true
            })
    }
})

export const { resetState } = messageSlice.actions
export default messageSlice.reducer