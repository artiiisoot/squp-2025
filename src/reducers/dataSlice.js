import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  data: [],
  allData: [],
  res: null,
  filters: {
    ra_column: "",
    search_text: "",
    s_date: "",
    e_date: "",
    ra_sort: "desc",
  },
  page: null,
  per_page: null,
  total: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setAllData(state, action) {
      state.allData = action.payload;
    },
    setDataReset(state) {
      Object.assign(state, initialState);
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setFiltersReset(state) {
      Object.assign(state, initialState);
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPerPage(state, action) {
      state.per_page = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setResponse(state, action) {
      state.res = action.payload;
    },
  },
});

export const {
  setData,
  setAllData,
  setDataReset,
  setFilters,
  setFiltersReset,
  setPage,
  setPerPage,
  setTotal,
  setResponse,
} = dataSlice.actions;
export default dataSlice.reducer;
