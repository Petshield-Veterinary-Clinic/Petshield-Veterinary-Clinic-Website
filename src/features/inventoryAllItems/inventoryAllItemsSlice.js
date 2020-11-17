import { createSlice } from "@reduxjs/toolkit";
import { getInventoryAllItems } from "../../api/inventoryAllItemsApi";
import { getItemsWithSearchTerm } from "../../api/items";

let initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const inventoryAllItemsSlice = createSlice({
  name: "inventoryAllItems",
  initialState,
  reducers: {
    getAllItemsStart(state, action) {
      state.isLoading = true;
    },
    getAllItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    getAllItemsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchItemsSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    searchItemsStart(state, action) {
      state.isLoading = true;
    },
    searchItemsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllItemsStart,
  getAllItemsSuccess,
  getAllItemsFailure,
  searchItemsStart,
  searchItemsSuccess,
  searchItemsFailure,
} = inventoryAllItemsSlice.actions;

export default inventoryAllItemsSlice.reducer;

export const fetchAllItems = () => async (dispatch) => {
  try {
    dispatch(getAllItemsStart());
    const items = await getInventoryAllItems();
    dispatch(getAllItemsSuccess(items));
  } catch (error) {
    dispatch(getAllItemsFailure(error.message));
  }
};

export const fetchAllItemsWithSearch = (searchTerm) => async (dispatch) => {
  try {
    dispatch(searchItemsStart());
    const items = await getItemsWithSearchTerm(searchTerm);
    dispatch(searchItemsSuccess(items));
  } catch (error) {
    dispatch(searchItemsFailure(error.message));
  }
};
