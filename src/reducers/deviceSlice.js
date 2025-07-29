import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  deviceType: "desktop",
  isMobile: null,
  serverMode: "",
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDeviceType(state, action) {
      state.deviceType = action.payload.deviceType;
      state.isMobile = state.deviceType === "mobile" ? true : false;
    },
    setServerMode(state, action) {
      state.serverMode = action.payload;
    },
    setResetDeviceType(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setDeviceType,
  setServerMode,
  setResetDeviceType,
} = deviceSlice.actions;
export default deviceSlice.reducer;
