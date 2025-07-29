import { createSlice } from "@reduxjs/toolkit";

const token = sessionStorage.getItem("token");
const expiresAt = parseInt(sessionStorage.getItem("expiresAt") || "0", 10);
const now = Date.now();

const initialState = {
  isLogin: !!token,
  token: token || null,
  expiresAt: expiresAt || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action) {
      const { token, expiresIn = 6000 } = action.payload; // seconds
      const expiresAt = Date.now() + expiresIn * 1000;
      state.isLogin = true;
      state.token = action.payload;
      state.expiresAt = expiresAt;
      sessionStorage.setItem("token", action.payload);
      sessionStorage.setItem("expiresAt", expiresAt.toString());
    },
    setLogout(state) {
      state.isLogin = false;
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
