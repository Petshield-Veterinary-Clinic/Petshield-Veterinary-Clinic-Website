import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InventoryAllItemsSearchField from "./InventoryAllItemsSearchField";
import { makeStyles } from "@material-ui/core/styles";
import { fetchItems } from "../inventorySlice";
import { InventoryAllItemsTable } from "./InventoryAllItemsTable/InventoryAllItemsTable";

const useStyles = makeStyles((_) => {
  return {
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    loadingIndicator: {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
const InventoryAllItems = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, items, error } = useSelector((state) => state.inventory);

  useEffect(() => {
    if (!isLoading && !items) {
      dispatch(fetchItems());
    }
  }, [items, isLoading, dispatch]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={classes.loadingIndicator}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    if (error) {
      return <div>An Error has occured!</div>;
    }
    return <InventoryAllItemsTable items={items} />;
  };
  return (
    <div className={classes.root}>
      <InventoryAllItemsSearchField />
      {renderContent()}
    </div>
  );
};

export default InventoryAllItems;
