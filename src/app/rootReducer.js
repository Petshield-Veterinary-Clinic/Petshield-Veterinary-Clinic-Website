import { combineReducers } from "@reduxjs/toolkit";

import inventoryReducer from "../features/inventory/inventorySlice"
import modalsReducer from "../features/modals/modalSlice";

const rootReducer = combineReducers({
    inventory: inventoryReducer,
    modals: modalsReducer,
});

export default rootReducer;
