import { createSlice } from "@reduxjs/toolkit";

import {
  getItemsWithSearchTerm,
  getItems,
  addItem as addItemToApi,
  modifyItem as modifyItemFromApi,
  discountItem as discountItemFromApi,
} from "../../../api/inventory";
import { config } from "../../../consts";

import { showModal } from "../../modals/modalSlice";
import { clearItemsSearch } from "../inventorySearchSlice";

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
      // state.items = [...state.items, action.payload];
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

export const fetchItems = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  const token = localStorage.getItem("token");
  try {
    dispatch(fetchItemsStart());
    const ws = new WebSocket(
      `${config.WS_BASE_URL}/items/${user.branchName}?jwt=${token}`
    );
    ws.onmessage = (e) => {
      const response = JSON.parse(e.data);
      dispatch(fetchItemsSuccess(response.data));
    };
  } catch (error) {
    dispatch(fetchItemsFailure(error.message));
  }
};

export const addItem = (itemDetails) => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    dispatch(addItemStart());
    dispatch(showModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    await addItemToApi(itemDetails, user.branchName);
    dispatch(
      showModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Item Successfully Added!",
          duration: 3000,
        },
      })
    );
    dispatch(addItemSuccess());
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

export const modifyItem = (itemDetails, itemIndex) => async (
  dispatch,
  getState
) => {
  const { user } = getState().auth;

  try {
    dispatch(modifyItemStart());
    dispatch(showModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    const newItem = await modifyItemFromApi(itemDetails, user.branchName);

    dispatch(
      showModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Item Successfully Modified!",
          duration: 3000,
        },
      })
    );
    dispatch(clearItemsSearch());
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

export const discountItem = (itemDetails, itemIndex) => async (
  dispatch,
  getState
) => {
  const { user } = getState().auth;
  try {
    dispatch(discountItemStart());
    dispatch(showModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    const newItem = await discountItemFromApi(itemDetails, user.branchName);
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
