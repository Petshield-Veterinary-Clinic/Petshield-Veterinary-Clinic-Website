import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllItems } from "./inventoryAllItemsSlice";
import { InventoryAllItemsTable } from "./InventoryAllItemsTable";
const InventoryAllItems = () => {
  const dispatch = useDispatch();
  const { isLoading, items, error } = useSelector(
    (state) => state.inventoryAllItems
  );

  useEffect(() => {
    if (!isLoading && items.length === 0) {
      dispatch(fetchAllItems());
    }
  }, [items, isLoading, dispatch]);

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>An Error has occured!</div>;
    }
    return (
      <div>
        <InventoryAllItemsTable items={items} />
      </div>
    );
  };
  return renderContent();
};

export default InventoryAllItems;
