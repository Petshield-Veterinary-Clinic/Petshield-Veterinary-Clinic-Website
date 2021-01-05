import { combineReducers } from "@reduxjs/toolkit";

import inventoryItemsReducer from "../features/inventory/inventoryItems/inventoryItemsSlice";
import inventorySalesReducer from "../features/inventory/inventorySales/inventorySalesSlice";
import inventorySearchReducer from "../features/inventory/inventorySearchSlice";
import modalsReducer from "../features/modals/modalSlice";
import authReducer from "../features/auth/authSlice";
import drawerReducer from "../features/drawer/drawerSlice";

const rootReducer = combineReducers({
  inventoryItems: inventoryItemsReducer,
  inventorySales: inventorySalesReducer,
  inventorySearch: inventorySearchReducer,
  modals: modalsReducer,
  auth: authReducer,
  drawer: drawerReducer,
});

export default rootReducer;
