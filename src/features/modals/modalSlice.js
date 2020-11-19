import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    modalType : null,
    modalProps: {},
}

const modalsSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        showModal(state, action) {
            state.modalType = action.payload.modalType;
            state.modalProps = action.payload.modalProps;
        },
        hideModal(state, _) {
            state.modalType = '';
            state.modalProps = {};
        }
    }

})

export default modalsSlice.reducer;

export const {showModal, hideModal} = modalsSlice.actions;