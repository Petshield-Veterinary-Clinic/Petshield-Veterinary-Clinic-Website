import { createSlice } from "@reduxjs/toolkit";

import {
  getItemsWithSearchTerm,
  getItems,
  addItem as addItemToApi,
  modifyItem as modifyItemFromApi,
  discountItem as discountItemFromApi,
  getItemSales,
} from "../../api/inventory";

import { showModal } from "../modals/modalSlice";

let initialState = {
  items: [],
  itemSales: [],
  isLoading: false,
  error: null,
};

const handleOnStart = (state) => {
  state.isLoading = true;
};

const handleOnError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    getItemsStart: handleOnStart,
    getItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    getItemsFailure: handleOnError,
    searchItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    searchItemsStart: handleOnStart,
    searchItemsFailure: handleOnError,
    addItemStart(_, __) {},
    addItemSuccess(state, action) {
      state.items = [...state.items, action.payload];
    },
    addItemFailure: handleOnError,
    modifyItemStart() {},
    modifyItemSuccess(state, action) {
      state.items = state.items.map((item, index) => {
        if (index === action.payload.itemIndex) {
          return action.payload.newItem;
        }
        return item;
      });
    },
    modifyItemFailure: handleOnError,
    discountItemStart() {},
    discountItemSuccess(state, action) {
      state.items = state.items.map((item, index) => {
        if (index === action.payload.itemIndex) {
          return action.payload.newItem;
        }
        return item;
      });
    },
    discountItemFailure: handleOnError,
    fetchItemSalesStart: handleOnStart,
    fetchItemSalesSuccess(state, action) {
      state.itemSales = action.payload;
      state.isLoading = false;
    },
    fetchItemSalesFailure: handleOnError,
    addItemSaleStart() {},
    addItemSaleSuccess(state, action) {},
    addItemSaleFailure: handleOnError,
  },
});

export const {
  getItemsStart,
  getItemsSuccess,
  getItemsFailure,
  fetchItemSalesStart,
  fetchItemSalesSuccess,
  fetchItemSalesFailure,
  addItemSaleStart,
  addItemSaleSuccess,
  addItemSaleFailure,
  searchItemsStart,
  searchItemsSuccess,
  searchItemsFailure,
  addItemStart,
  addItemSuccess,
  addItemFailure,
  modifyItemStart,
  modifyItemSuccess,
  modifyItemFailure,
  discountItemStart,
  discountItemFailure,
  discountItemSuccess,
} = inventorySlice.actions;

export default inventorySlice.reducer;

export const fetchItems = () => async (dispatch) => {
  try {
    dispatch(getItemsStart());
    const items = await getItems();
    dispatch(getItemsSuccess(items));
  } catch (error) {
    dispatch(getItemsFailure(error.message));
  }
};

export const fetchItemsWithSearch = (searchTerm) => async (dispatch) => {
  try {
    dispatch(searchItemsStart());

    const items = await getItemsWithSearchTerm(searchTerm);

    dispatch(searchItemsSuccess(items));
  } catch (error) {
    dispatch(searchItemsFailure(error.message));
  }
};

export const addItem = (itemDetails) => async (dispatch) => {
  try {
    dispatch(addItemStart());
    dispatch(showModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    await addItemToApi(itemDetails);
    dispatch(
      showModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Item Successfully Added!",
          duration: 3000,
        },
      })
    );
    dispatch(addItemSuccess(itemDetails));
  } catch (error) {
    dispatch(
      showModal({
        modalType: "ERROR_MODAL",
        modalProps: {
          message: error.message,
          duration: 3000,
        },
      })
    );
    dispatch(addItemFailure(error.message));
  }
};

export const modifyItem = (itemDetails, itemIndex) => async (dispatch) => {
  try {
    dispatch(modifyItemStart());
    dispatch(showModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    const newItem = await modifyItemFromApi(itemDetails);
    dispatch(
      showModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Item Successfully Modified!",
          duration: 3000,
        },
      })
    );
    dispatch(modifyItemSuccess({ newItem, itemIndex }));
  } catch (error) {
    dispatch(
      showModal({
        modalType: "ERROR_MODAL",
        modalProps: {
          message: error.message,
          duration: 3000,
        },
      })
    );
    dispatch(modifyItemFailure());
  }
};

export const discountItem = (itemDetails, itemIndex) => async (dispatch) => {
  try {
    dispatch(discountItemStart());
    dispatch(showModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    const newItem = await discountItemFromApi(itemDetails);
    dispatch(
      showModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Item Discounted!",
          duration: 3000,
        },
      })
    );
    dispatch(discountItemSuccess({ newItem, itemIndex }));
  } catch (error) {
    dispatch(
      showModal({
        modalType: "ERROR_MODAL",
        modalProps: {
          message: error.message,
          duration: 3000,
        },
      })
    );
    dispatch(discountItemFailure());
  }
};

export const fetchItemSales = () => async (dispatch) => {
  try {
    dispatch(fetchItemSalesStart());
    const items = await getItemSales();
    dispatch(fetchItemSalesSuccess(items));
  } catch (error) {
    dispatch(fetchItemSalesFailure(error));
  }
};
