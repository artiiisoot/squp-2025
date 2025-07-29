import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startPosition: 0,
  endPosition: 0,
};

const refSlice = createSlice({
  name: "ref",
  initialState,
  reducers: {
    setStartPosition: (state, action) => {
      state.startPosition = action.payload;
    },
    setEndPosition: (state, action) => {
      state.endPosition = action.payload;
    },
  },
});

export const { setStartPosition, setEndPosition } = refSlice.actions;
export default refSlice.reducer;
