import { createSlice } from "@reduxjs/toolkit";

import {
  getItemsWithSearchTerm,
  getItems,
  addItem as addItemToApi,
  modifyItem as modifyItemFromApi,
  discountItem as discountItemFromApi,
} from "../../../api/inventory";

import { showModal } from "../../modals/modalSlice";

let initialState = {
  items: [],
  itemSales: [],
  isLoading: false,
  error: null,
};

const handleStart = (state) => {
  state.isLoading = true;
};

const handleError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const inventorySlice = createSlice({
  name: "inventoryItems",
  initialState,
  reducers: {
    fetchItemsStart: handleStart,
    fetchItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchItemsFailure: handleError,
    addItemStart(_, __) {},
    addItemSuccess(state, action) {
      state.items = [...state.items, action.payload];
    },
    addItemFailure: handleError,
    modifyItemStart() {},
    modifyItemSuccess(state, action) {
      state.items = state.items.map((item, index) => {
        if (index === action.payload.itemIndex) {
          return action.payload.newItem;
        }
        return item;
      });
    },
    modifyItemFailure: handleError,
    discountItemStart() {},
    discountItemSuccess(state, action) {
      state.items = state.items.map((item, index) => {
        if (index === action.payload.itemIndex) {
          return action.payload.newItem;
        }
        return item;
      });
    },
    discountItemFailure: handleError,
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
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
    dispatch(fetchItemsStart());
    const items = await getItems();
    dispatch(fetchItemsSuccess(items));
  } catch (error) {
    dispatch(fetchItemsFailure(error.message));
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
