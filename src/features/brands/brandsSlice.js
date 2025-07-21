import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  size: 10,
}

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    setSize(state, action) {
      state.size = action.payload
      state.page = 1 // сбрасываем страницу при смене размера
    },
  },
})

export const { setPage, setSize } = brandsSlice.actions
export default brandsSlice.reducer 