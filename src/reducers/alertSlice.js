import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  title: "",
  context: "",
  btnName: "",
  isShowModal: false,
  onConfirm: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setIsModalAlert(state, action) {
      state.title = action.payload.title;
      state.context = action.payload.context;
      state.btnName = action.payload.btnName;
      state.isShowModal = action.payload.isShowModal;
      state.onConfirm = action.payload.onConfirm || null; // 저장
    },
    setPopupReset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setPopupReset, setIsModalAlert } = alertSlice.actions;
export default alertSlice.reducer;
