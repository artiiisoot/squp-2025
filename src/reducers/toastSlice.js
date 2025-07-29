import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  type: '',
  content: '',
  isShow: false,
  toastKey: 0,
}

let toastId = 0

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    list: [], // [{ id, content, type }]
  },
  reducers: {
    addToast: (state, action) => {
      state.list.push({
        id: ++toastId,
        ...action.payload,
      })
    },
    removeToast: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = toastSlice.actions
export default toastSlice.reducer
