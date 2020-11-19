import { createSlice } from "@reduxjs/toolkit";

import {
  getItemsWithSearchTerm,
  getItems,
  addItem as addItemToApi,
} from "../../api/inventory";

import { showModal } from "../modals/modalSlice";

let initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    getItemsStart(state, _) {
      state.isLoading = true;
    },
    getItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    getItemsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    searchItemsStart(state, _) {
      state.isLoading = true;
    },
    searchItemsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addItemStart(_, __) {},
    addItemSuccess(state, action) {
      state.items = [...state.items, action.payload];
    },
    addItemFailure(_, __) {},
  },
});

export const {
  getItemsStart,
  getItemsSuccess,
  getItemsFailure,
  searchItemsStart,
  searchItemsSuccess,
  searchItemsFailure,
  addItemStart,
  addItemSuccess,
  addItemFailure,
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
