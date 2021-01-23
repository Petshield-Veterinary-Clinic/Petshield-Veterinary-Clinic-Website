import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  modalType: null,
  modalProps: {},
};

const infoModals = createSlice({
  name: "infoModal",
  initialState,
  reducers: {
    showInfoModal(state, action) {
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    hideInfoModal(state, _) {
      state.modalType = "";
      state.modalProps = {};
    },
  },
});

export default infoModals.reducer;

export const { showInfoModal, hideInfoModal } = infoModals.actions;
