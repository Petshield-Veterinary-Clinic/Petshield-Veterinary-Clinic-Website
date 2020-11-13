import { combineReducers } from "@reduxjs/toolkit";

import inventoryAllItemsReducer from "../features/inventoryAllItems/inventoryAllItemsSlice"

const rootReducer = combineReducers({
    inventoryAllItems: inventoryAllItemsReducer,
});

export default rootReducer;
