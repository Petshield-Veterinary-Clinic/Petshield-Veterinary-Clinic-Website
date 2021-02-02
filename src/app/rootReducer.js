import { combineReducers } from "@reduxjs/toolkit";

import inventoryItemsReducer from "../features/inventory/inventoryItems/inventoryItemsSlice";
import inventorySalesReducer from "../features/inventory/inventorySales/inventorySalesSlice";
import inventorySearchReducer from "../features/inventory/inventorySearchSlice";
import homeSalesStats from "../features/home/homeDashboard/homeSalesStats/homeSalesStatsSlice";
import modalsReducer from "../features/modals/modalSlice";
import infoModalsReducer from "../features/modals/infoModalSlice";
import authReducer from "../features/auth/authSlice";
import drawerReducer from "../features/drawer/drawerSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import clientsReducer from "../features/clients/clientsSlice";
import itemCategoriesReducer from "../features/itemCategory/itemCategorySlice";

const rootReducer = combineReducers({
  inventoryItems: inventoryItemsReducer,
  inventorySales: inventorySalesReducer,
  inventorySearch: inventorySearchReducer,
  homeSalesStats: homeSalesStats,
  modals: modalsReducer,
  infoModals: infoModalsReducer,
  auth: authReducer,
  drawer: drawerReducer,
  clients: clientsReducer,
  notifications: notificationsReducer,
  itemCategories: itemCategoriesReducer,
});

export default rootReducer;
