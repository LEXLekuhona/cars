import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from 'js-cookie'
import { BASE_URL, STORAGE_KEYS } from '../../shared/config'

axios.defaults.baseURL = BASE_URL


export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
    
    const data = new URLSearchParams({
        username,
        password
    })

    const response = await axios.post('/auth/token', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    return response.data.access_token
     
})



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: Cookies.get(STORAGE_KEYS.token) || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            Cookies.remove(STORAGE_KEYS.token);
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
                Cookies.set(STORAGE_KEYS.token, action.payload, { expires: 1 });
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;