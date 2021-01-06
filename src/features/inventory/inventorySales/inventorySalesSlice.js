import { createSlice } from "@reduxjs/toolkit";
import {
  addItemSale as addItemSaleToApi,
  deleteItemSale as deleteItemSaleFromApi,
} from "../../../api/inventory";
import { config } from "../../../consts";
import { showModal, hideModal } from "../../modals/modalSlice";
import { clearItemsSearch } from "../inventorySearchSlice";

let initialState = {
  isLoading: false,
  itemSales: [],
  dailySales: 0,
  metadata: null,
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
      state.metadata = action.payload.metadata;
      state.error = null;
    },
    fetchItemSalesError: handleOnError,
    addItemSaleStart() {},
    addItemSaleSuccess(state, _) {
      state.isLoading = false;
      state.error = null;
    },
    addItemSaleFailure: handleOnError,
    deleteItemSaleStart() {},
    deleteItemSaleSuccess(state, _) {
      state.isLoading = false;
      state.error = null;
    },
    deleteItemSaleFailure: handleOnError,
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
  deleteItemSaleFailure,
  deleteItemSaleStart,
  deleteItemSaleSuccess,
} = inventorySalesSlice.actions;

export const fetchItemSales = (salesDate) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const token = localStorage.getItem("token");
  try {
    dispatch(fetchItemSalesStart());
    let ws;

    if (salesDate !== "" && salesDate !== "all") {
      ws = new WebSocket(
        `${config.WS_BASE_URL}/item-sales/${user.branchName}?jwt=${token}&salesDate=${salesDate}&filterSales=true`
      );
    } else {
      ws = new WebSocket(
        `${config.WS_BASE_URL}/item-sales/${user.branchName}?jwt=${token}&filterSales=false`
      );
    }
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
    dispatch(hideModal());
    dispatch(
      showModal({
        modalType: "LOADING_MODAL",
      })
    );
    const newItemSale = await addItemSaleToApi(
      user.branchName,
      itemId,
      itemQuantity
    );
    dispatch(addItemSaleSuccess(newItemSale));
    dispatch(hideModal());
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

export const deleteItemSale = (itemId) => async (dispatch, getState) => {
  try {
    const { user } = getState().auth;
    dispatch(deleteItemSaleStart());
    dispatch(hideModal());
    dispatch(
      showModal({
        modalType: "LOADING_MODAL",
      })
    );
    const deletedItemSale = await deleteItemSaleFromApi(
      user.branchName,
      itemId
    );
    dispatch(deleteItemSaleSuccess(deletedItemSale));
    dispatch(hideModal());
    dispatch(
      showModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Transaction deleted successfully!",
          duration: 3000,
        },
      })
    );
    dispatch(clearItemsSearch());
  } catch (error) {
    dispatch(deleteItemSaleFailure(error));
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
