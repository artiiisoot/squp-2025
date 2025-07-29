import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/reducers/authSlice";
import alertSlice from "@/reducers/alertSlice";
import dataSlice from "@/reducers/dataSlice";
import deviceSlice from "@/reducers/deviceSlice";
import modalSlice from "@/reducers/modalSlice";
import refSlice from "@/reducers/refSlice";
import toastSlice from "@/reducers/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    alert: alertSlice,
    data: dataSlice,
    device: deviceSlice,
    modal: modalSlice,
    ref: refSlice,
    toast: toastSlice,
  },
});
