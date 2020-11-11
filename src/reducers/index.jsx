import { combineReducers } from "redux";
import inventoryReducer from "./inventoryReducer";

const reducers = combineReducers({
  inventory: inventoryReducer,
});
