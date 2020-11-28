import { createSlice } from "@reduxjs/toolkit";
import { getItemSales } from "../../../api/inventory";

let initialState = {
  isLoading: false,
  itemSales: [],
  error: null,
};

const handleOnStart = (state) => {
  state.isLoading = true;
};

const handleOnError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const inventorySalesSlice = createSlice({
  name: "inventorySales",
  initialState,
  reducers: {
    fetchItemSalesStart: handleOnStart,
    fetchItemSalesSuccess(state, action) {
      state.isLoading = false;
      state.itemSales = action.payload;
      state.error = null;
    },
    fetchItemSalesError: handleOnError,
    addItemSaleStart() {},
    addItemSaleSuccess(state, action) {
      state.isLoading = false;
      state.itemSales = [...state.itemSales, action.payload];
      state.error = null;
    },
    addItemSaleFailure: handleOnError,
  },
});

export default inventorySalesSlice.reducer;

export const {
  fetchItemSalesError,
  fetchItemSalesStart,
  fetchItemSalesSuccess,
  addItemSaleFailure,
  addItemSaleStart,
  addItemSaleSuccess,
} = inventorySalesSlice.actions;

export const fetchItemSales = (branchName) => async (dispatch) => {
  try {
    dispatch(fetchItemSalesStart());
    const sales = await getItemSales();
    dispatch(fetchItemSalesSuccess(sales));
  } catch (error) {
    dispatch(fetchItemSalesError(error));
  }
};
