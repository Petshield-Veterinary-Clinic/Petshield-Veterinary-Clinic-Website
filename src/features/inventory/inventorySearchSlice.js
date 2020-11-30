import { createSlice } from "@reduxjs/toolkit";
import { getItemsWithSearchTerm } from "../../api/inventory";

const initialState = {
  isLoading: false,
  result: [],
  error: null,
};

const inventorySearchSlice = createSlice({
  name: "inventorySearchResultSlice",
  initialState,
  reducers: {
    searchItemsStart(state) {
      state.isLoading = true;
    },
    searchItemsSuccess(state, action) {
      state.isLoading = false;
      state.result = action.payload;
      state.error = null;
    },
    searchItemsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearItemsSearch(state, action) {
      state.result = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default inventorySearchSlice.reducer;

export const {
  searchItemsFailure,
  searchItemsStart,
  searchItemsSuccess,
  clearItemsSearch,
} = inventorySearchSlice.actions;

export const searchItems = (searchTerm) => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    dispatch(searchItemsStart());
    const items = await getItemsWithSearchTerm(searchTerm, user.branchName);
    dispatch(searchItemsSuccess(items));
  } catch (error) {
    dispatch(searchItemsFailure(error));
  }
};
