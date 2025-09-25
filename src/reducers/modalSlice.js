import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isShowModal: false,
  type: "",
  title: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsShowModal(state, action) {
      state.isShowModal = action.payload.isShowModal;
      state.type = action.payload.type;
      state.title = action.payload.title;
    },
    setIsCloseModal(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setIsShowModal, setIsCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
