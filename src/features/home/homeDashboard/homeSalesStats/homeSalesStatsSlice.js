import { createSlice } from "@reduxjs/toolkit";
import { getItemSalesStats as getItemSalesStatesFromApi } from "../../../../api/stats";

let initialState = {
  isLoading: false,
  stats: {},
  error: null,
};
const handleOnStart = (state) => {
  state.isLoading = true;
};

const handleOnError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const homeSalesStatsSlice = createSlice({
  name: "homeSalesStats",
  initialState,
  reducers: {
    fetchItemSalesStatsStart: handleOnStart,
    fetchItemSalesStatsSuccess(state, action) {
      state.isLoading = false;
      state.stats = action.payload;
    },
    fetchItemSalesStatsFailure: handleOnError,
  },
});

export default homeSalesStatsSlice.reducer;

export const {
  fetchItemSalesStatsFailure,
  fetchItemSalesStatsStart,
  fetchItemSalesStatsSuccess,
} = homeSalesStatsSlice.actions;

export const fetchItemSalesStats = (salesDate, salesDateCateg) => async (
  dispatch,
  getState
) => {
  const { user } = getState().auth;

  try {
    dispatch(fetchItemSalesStatsStart());
    const stats = await getItemSalesStatesFromApi(
      user.branchName,
      salesDate,
      salesDateCateg
    );
    dispatch(fetchItemSalesStatsSuccess(stats));
  } catch (error) {
    dispatch(fetchItemSalesStatsFailure(error));
  }
};
