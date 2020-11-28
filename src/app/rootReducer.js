import { combineReducers } from "@reduxjs/toolkit";

import inventoryReducer from "../features/inventory/inventorySlice";
import inventorySalesReducer from "../features/inventory/inventorySales/inventorySalesSlice";
import modalsReducer from "../features/modals/modalSlice";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  inventorySales: inventorySalesReducer,
  modals: modalsReducer,
  auth: authReducer,
});

export default rootReducer;
