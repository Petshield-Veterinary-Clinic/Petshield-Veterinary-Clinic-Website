import { combineReducers } from "@reduxjs/toolkit";

import inventoryReducer from "../features/inventory/inventorySlice";
import modalsReducer from "../features/modals/modalSlice";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  modals: modalsReducer,
  auth: authReducer,
});

export default rootReducer;
