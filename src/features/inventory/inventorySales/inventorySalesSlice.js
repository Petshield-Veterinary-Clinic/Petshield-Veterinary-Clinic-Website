import { createSlice } from "@reduxjs/toolkit";
import {
  getItemSales,
  addItemSale as addItemSaleToApi,
} from "../../../api/inventory";
import { config } from "../../../consts";
import { showModal } from "../../modals/modalSlice";
import { clearItemsSearch } from "../inventorySearchSlice";

let initialState = {
  isLoading: false,
  itemSales: [],
  dailySales: 0,
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
      state.itemSales = action.payload.itemSales;
      state.dailySales = action.payload.dailySales;
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

export const fetchItemSales = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  const token = localStorage.getItem("token");
  try {
    dispatch(fetchItemSalesStart());
    const ws = new WebSocket(
      `${config.WS_BASE_URL}/item-sales/${user.branchName}?jwt=${token}`
    );

    ws.onmessage = (e) => {
      const response = JSON.parse(e.data);
      dispatch(fetchItemSalesSuccess(response.data));
    };
  } catch (error) {
    dispatch(fetchItemSalesError(error));
  }
};

export const addItemSale = (itemId, itemQuantity) => async (
  dispatch,
  getState
) => {
  try {
    const { user } = getState().auth;
    dispatch(addItemSaleStart());
    const newItemSale = await addItemSaleToApi(
      user.branchName,
      itemId,
      itemQuantity
    );
    dispatch(addItemSaleSuccess(newItemSale));
    dispatch(
      showModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Transaction Complete!",
          duration: 3000,
        },
      })
    );
    dispatch(clearItemsSearch());
  } catch (error) {
    dispatch(addItemSaleFailure(error));
    dispatch(
      showModal({
        modalType: "ERROR_MODAL",
        modalProps: {
          message: error.message,
          duration: 3000,
        },
      })
    );
  }
};
