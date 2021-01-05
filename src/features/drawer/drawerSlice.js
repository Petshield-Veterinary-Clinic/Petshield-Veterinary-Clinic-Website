import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export default drawerSlice.reducer;

export const { toggleDrawer } = drawerSlice.actions;
