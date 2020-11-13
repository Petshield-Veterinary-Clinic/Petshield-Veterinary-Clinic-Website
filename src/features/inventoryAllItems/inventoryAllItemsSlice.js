import {createSlice} from "@reduxjs/toolkit";
import { getInventoryAllItems } from "../../api/inventoryAllItemsApi";


let initialState = {
    items:[],
    isLoading:false,
    error: null,
}

const inventoryAllItemsSlice = createSlice({
    name:"inventoryAllItems",
    initialState,
    reducers:{
        getAllItemsStart(state,action) {
            state.isLoading =true;
        },
        getAllItemsSuccess(state, action){
            state.isLoading = false;
            state.items = action.payload;
            state.error=null;
        },
        getAllItemsFailure(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        searchItems(state,action) {
            state.items = action.payload;
        }
    }
})



export const {getAllItemsStart,getAllItemsSuccess, getAllItemsFailure, searchItems} = inventoryAllItemsSlice.actions;

export default inventoryAllItemsSlice.reducer;

export const fetchAllItems = () => async (dispatch) => {
  try {
      dispatch(getAllItemsStart())
      const items = await getInventoryAllItems();
      dispatch(getAllItemsSuccess(items))
  } catch (error) {
      dispatch(getAllItemsFailure(error.message))
  }
   
}