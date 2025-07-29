import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isShowModal: false,
  type: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsShowModal(state, action) {
      state.isShowModal = action.payload.isShowModal;
      state.type = action.payload.type;
    },
    setIsCloseModal(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setIsShowModal, setIsCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
