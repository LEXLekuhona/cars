import authReducer from '@features/auth/authSlice';
import brandsReducer from '@features/brands/brandsSlice';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        auth: authReducer,
        brands: brandsReducer,
    }
})

export default store