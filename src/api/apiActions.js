import CryptoJS from "crypto-js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { callApi } from "./callApi";
import { setLogin, setLogout } from "@/reducers/authSlice";
import {
  setData,
  setAllData,
  setDataReset,
  setFilters,
  setPage,
  setPerPage,
  setResponse,
  setTotal,
} from "@/reducers/dataSlice";

const KEY = process.env.REACT_APP_API_KEY;

export const getData = createAsyncThunk(
  "./api_copy.php/member_list",
  async (payload, { dispatch }) => {
    const response = await callApi({
      endpoint: "/member_list",
      method: "POST",
      body: { ...payload, ra_year: 2025 },
      useHash: true,
    });

    if (response?.data) {
      dispatch(setData(response.data));
      dispatch(setResponse(response.query));
      // dispatch(setPage(response.page));
      // dispatch(setPerPage(response.perPage));
      dispatch(setTotal(response.total));
    }

    // console.log("per_page", response.per_page);
    // console.log("payload1", response);

    return response;
  }
);
export const getAllData = createAsyncThunk(
  "./api_copy.php/member_list",
  async (payload, { dispatch }) => {
    const response = await callApi({
      endpoint: "/member_list",
      method: "POST",
      body: { ...payload, ra_year: 2025 },
      useHash: true,
    });

    if (response?.data) {
      dispatch(setAllData(response.data));
      dispatch(setResponse(response.query));
      // dispatch(setPage(response.page));
      // dispatch(setPerPage(response.per_page));
      dispatch(setTotal(response.total));
    }

    // // console.log("per_page", response.per_page);
    // console.log("payload2", response.data);

    return response;
  }
);

export const login = createAsyncThunk(
  "./api_copy.php/login",
  async (payload, { dispatch }) => {
    const secureKey = CryptoJS.SHA256(KEY).toString();

    const response = await callApi({
      endpoint: "/login",
      method: "POST",
      body: payload,
      useHash: true,
    });

    console.log("payload", payload);

    if (response?.code === 1000) {
      dispatch(setLogin(secureKey));
    }

    return response;
  }
);

export const logout = createAsyncThunk(
  "./api_copy.php/logout",
  async (payload, { dispatch }) => {
    const response = await callApi({
      endpoint: "/logout",
      method: "POST",
      body: {},
      useHash: true,
    });

    if (response?.code === 2000) {
      dispatch(setLogout());
      dispatch(setDataReset());
    }

    return response;
  }
);

export const reserve = createAsyncThunk(
  "./api_copy.php/reservation",
  async (payload, { dispatch }) => {
    const response = await callApi({
      endpoint: "/reservation",
      method: "POST",
      body: payload,
      useHash: true,
    });

    return response;
  }
);
