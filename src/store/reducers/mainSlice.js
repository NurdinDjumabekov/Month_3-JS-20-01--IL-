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
  listAllProds: [], /// список всех товаров
  listActiveProds: [], /// список активный товаров каждого user(а)
  listWH: [], /// список цехов

  activeSlide: 0,
  activeSlideForProd: 0,
  listMenu: [...listMenuLocal],
};

////// getListInvoiceReq - get список накладных производства
export const getListInvoiceReq = createAsyncThunk(
  "getListInvoiceReq",
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

////// getListSubInvoiceReq - get список вложенных накладных коптильщиков
export const getListSubInvoiceReq = createAsyncThunk(
  "getListSubInvoiceReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/capt/get_sub_invoice`;
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

////// getEverySubInvoiceReq - get каждую вложенную накладную коптильщиков
export const getEverySubInvoiceReq = createAsyncThunk(
  "getEverySubInvoiceReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/capt/get_every_sub_invoice`;
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
    const url = `${REACT_APP_API_URL}/capt/crud_sub_invoice`;
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

////// getListCaptReq - get список коптильщиков
export const getListCaptReq = createAsyncThunk(
  "getListCaptReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/capt/get_list_kopt`;
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

////// getListProdsReq - get список товаров с категориями(все товары)
export const getListProdsReq = createAsyncThunk(
  "getListProdsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_product?workshop_guid=${data?.wh}&type=agent`;
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

////// getActiveListProdsReq - get список активных товаров с категориями
export const getActiveListProdsReq = createAsyncThunk(
  "getActiveListProdsReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/all/get_product_user`;
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

////// addProdsInInvoiceReq - добавление товара в накладную
export const addProdsInInvoiceReq = createAsyncThunk(
  "addProdsInInvoiceReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/capt/crud_subinvoice_product`;
    try {
      const response = await axiosInstance.put(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0]?.result;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////// getListWorkShopActiveReq - get список цехов
export const getListWorkShopActiveReq = createAsyncThunk(
  "getListWorkShopActiveReq",
  async function (props, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/ta/get_workshop`;
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

////// crudListWorkShopActiveReq - get список цехов
export const crudListWorkShopActiveReq = createAsyncThunk(
  "crudListWorkShopActiveReq",
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${REACT_APP_API_URL}/capt/crud_prods_active`;
    try {
      const response = await axiosInstance.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return response?.data?.[0]?.result;
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

    activeSlideForProdFN: (state, action) => {
      state.activeSlideForProd = action?.payload;
    },

    everySubInvoiceFN: (state, action) => {
      state.everySubInvoice = action?.payload;
    },

    listAllProdsFN: (state, action) => {
      state.listAllProds = action?.payload;
    },
  },
  extraReducers: (builder) => {
    ////////////// getListInvoiceReq
    builder.addCase(getListInvoiceReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoice = action.payload;
    });
    builder.addCase(getListInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listInvoice = [];
      state.preloader = false;
    });
    builder.addCase(getListInvoiceReq.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getListSubInvoiceReq
    builder.addCase(getListSubInvoiceReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSubInvoice = action.payload;
    });
    builder.addCase(getListSubInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listSubInvoice = [];
      state.preloader = false;
    });
    builder.addCase(getListSubInvoiceReq.pending, (state, action) => {
      state.preloader = true;
    });

    ////////////// getEverySubInvoiceReq
    builder.addCase(getEverySubInvoiceReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.everySubInvoice = action.payload;
    });
    builder.addCase(getEverySubInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.everySubInvoice = {};
      state.preloader = false;
    });
    builder.addCase(getEverySubInvoiceReq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// getListCaptReq
    builder.addCase(getListCaptReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listKoptilshiks = action.payload;
    });
    builder.addCase(getListCaptReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listKoptilshiks = [];
      state.preloader = false;
    });
    builder.addCase(getListCaptReq.pending, (state, action) => {
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

    ///////////////// getActiveListProdsReq
    builder.addCase(getActiveListProdsReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listActiveProds = action.payload;
    });
    builder.addCase(getActiveListProdsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listActiveProds = [];
      state.preloader = false;
    });
    builder.addCase(getActiveListProdsReq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// addProdsInInvoiceReq
    builder.addCase(addProdsInInvoiceReq.fulfilled, (state, action) => {
      state.preloader = false;
    });
    builder.addCase(addProdsInInvoiceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(addProdsInInvoiceReq.pending, (state, action) => {
      state.preloader = true;
    });

    ///////////////// getListWorkShopActiveReq
    builder.addCase(getListWorkShopActiveReq.fulfilled, (state, action) => {
      state.preloader = false;
      state.listWH = action.payload?.map((i) => {
        return { value: i?.guid, label: i?.name };
      });
    });
    builder.addCase(getListWorkShopActiveReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      state.listWH = [];
    });
    builder.addCase(getListWorkShopActiveReq.pending, (state, action) => {
      state.preloader = true;
    });
  },
});

export const {
  activeSlideFN,
  activeSlideForProdFN,
  everySubInvoiceFN,
  listAllProdsFN,
} = mainSlice.actions;

export default mainSlice.reducer;
