import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAlert } from "../../helpers/MyAlert";
import axiosInstance from "../../axiosInstance";
import { listMenuLocal } from "../../helpers/LocalData";

const { REACT_APP_API_URL } = process.env;
///////// mainSlice

const initialState = {
  preloader: false,
  listInvoice: [], /// список накладных
  listSubInvoice: [], /// список накладных
  everySubInvoice: {}, /// каждая накладная
  listKoptilshiks: [], /// список коптильщиков
  listAllProds: [], /// список коптильщиков

  activeSlide: 0,
  listMenu: [...listMenuLocal],
};

////// getListInvoice - get список накладных производства
export const getListInvoice = createAsyncThunk(
  "getListInvoice",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_production_invoice?num=10`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListSubInvoice - get список вложенных накладных коптильщиков
export const getListSubInvoice = createAsyncThunk(
  "getListSubInvoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_sub_invoice`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getEverySubInvoice - get каждую вложенную накладную коптильщиков
export const getEverySubInvoice = createAsyncThunk(
  "getEverySubInvoice",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_every_sub_invoice`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data || [];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// crudSubInvoiceReq - create edit del вложенную накладную коптильщиков
export const crudSubInvoiceReq = createAsyncThunk(
  "crudSubInvoiceReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/crud_sub_invoice`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0] || {};
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListKopt - get список коптильщиков
export const getListKopt = createAsyncThunk(
  "getListKopt",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_list_kopt`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data || [];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListProdsReq - get список товаров с категориями
export const getListProdsReq = createAsyncThunk(
  "getListProdsReq",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_product?workshop_guid=B717DA43-927B-4252-9B03-91EA6A22D7A8&type=agent`;
    try {
      const response = await axiosInstance(url);
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    activeSlideFN: (state, action) => {
      state.activeSlide = action?.payload;
    },

    everySubInvoiceFN: (state, action) => {
      state.everySubInvoice = action?.payload;
    },
  },
  extraReducers: (builder) => {
    ////////////// getListInvoice
    builder.addCase(getListInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoice = action.payload;
    });
    builder.addCase(getListInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.listInvoice = [];
      state.preloader = false;
    });
    builder.addCase(getListInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListSubInvoice
    builder.addCase(getListSubInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSubInvoice = action.payload;
    });
    builder.addCase(getListSubInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.listSubInvoice = [];
      state.preloader = false;
    });
    builder.addCase(getListSubInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getEverySubInvoice
    builder.addCase(getEverySubInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.everySubInvoice = action.payload;
    });
    builder.addCase(getEverySubInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.everySubInvoice = {};
      state.preloader = false;
    });
    builder.addCase(getEverySubInvoice.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// getListKopt
    builder.addCase(getListKopt.fulfilled, (state, action) => {
      state.preloader = false;
      state.listKoptilshiks = action.payload;
    });
    builder.addCase(getListKopt.rejected, (state, action) => {
      state.error = action.payload;
      state.listKoptilshiks = [];
      state.preloader = false;
    });
    builder.addCase(getListKopt.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// getListProdsReq
    builder.addCase(getListProdsReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listAllProds = action.payload;
    });
    builder.addCase(getListProdsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listAllProds = [];
      state.preloader = false;
    });
    builder.addCase(getListProdsReq.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const { activeSlideFN, everySubInvoiceFN } = mainSlice.actions;

export default mainSlice.reducer;
