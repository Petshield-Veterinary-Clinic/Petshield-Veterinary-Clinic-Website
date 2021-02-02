import { createSlice } from "@reduxjs/toolkit";
import {
  getItemCategories as apiGetItemCategories,
  addItemCategory as apiAddItemCategory,
  deleteItemCategory as apiDeleteItemCategory,
} from "../../api/item_category";
import { showInfoModal } from "../modals/infoModalSlice";

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const itemCategorySlice = createSlice({
  name: "itemCategorySlice",
  initialState,
  reducers: {
    fetchItemCategoriesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchItemCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchItemCategoriesFailure(state) {
      state.isLoading = false;
      state.error = null;
    },
    addItemCategoryStart(state) {
      state.error = null;
    },
    addItemCategorySuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    addItemCategoryFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteItemCategoryStart(state) {
      state.error = null;
    },
    deleteItemCategorySuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    },
    deleteItemCategoryFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default itemCategorySlice.reducer;

export const {
  fetchItemCategoriesFailure,
  fetchItemCategoriesStart,
  fetchItemCategoriesSuccess,
  addItemCategoryFailure,
  addItemCategoryStart,
  addItemCategorySuccess,
  deleteItemCategoryFailure,
  deleteItemCategoryStart,
  deleteItemCategorySuccess,
} = itemCategorySlice.actions;

export const fetchItemCategories = () => async (dispatch) => {
  try {
    dispatch(fetchItemCategoriesStart());
    const result = await apiGetItemCategories();
    dispatch(fetchItemCategoriesSuccess(result));
  } catch (error) {
    dispatch(fetchItemCategoriesFailure(error.message));
  }
};

export const addItemCategory = (itemCategoryDetails) => async (dispatch) => {
  try {
    dispatch(addItemCategoryStart());
    dispatch(showInfoModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    const results = await apiAddItemCategory(itemCategoryDetails);
    dispatch(
      showInfoModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Item Category Added!",
          duration: 3000,
        },
      })
    );
    dispatch(addItemCategorySuccess(results));
  } catch (error) {
    dispatch(
      showInfoModal({
        modalType: "ERROR_MODAL",
        modalProps: {
          message: error.message,
          duration: 3000,
        },
      })
    );
    dispatch(addItemCategoryFailure(error.message));
  }
};

export const deleteItemCategory = (itemCategoryId) => async (dispatch) => {
  try {
    dispatch(deleteItemCategoryStart());
    dispatch(showInfoModal({ modalType: "LOADING_MODAL", modalProps: {} }));
    const results = await apiDeleteItemCategory(itemCategoryId);
    dispatch(
      showInfoModal({
        modalType: "SUCCESS_MODAL",
        modalProps: {
          message: "Item Category Deleted!",
          duration: 3000,
        },
      })
    );
    dispatch(deleteItemCategorySuccess(results));
  } catch (error) {
    dispatch(
      showInfoModal({
        modalType: "ERROR_MODAL",
        modalProps: {
          message: error.message,
          duration: 3000,
        },
      })
    );
    dispatch(deleteItemCategoryFailure(error.message));
  }
};
