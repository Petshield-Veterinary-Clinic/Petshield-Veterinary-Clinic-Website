import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InventoryItemsSearchField from "./InventoryItemsSearchField";
import { makeStyles } from "@material-ui/core/styles";
import { fetchItems } from "./inventoryItemsSlice";
import InventoryItemsTableContainer from "./InventoryItemsTable/InventoryItemsTableContainer";
import _ from "lodash";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(3),
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",

      paddingTop: "83px",
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

const InventoryItems = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, items, error } = useSelector(
    (state) => state.inventoryItems
  );
  const { isLoading: isSearching, result, error: searchError } = useSelector(
    (state) => state.inventorySearch
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const renderContent = () => {
    if (isLoading || isSearching) {
      return (
        <div className={classes.loadingIndicator}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    if (error) {
      return <div>An Error has occured!</div>;
    }
    return (
      <InventoryItemsTableContainer
        items={result.length > 0 ? result : items}
      />
    );
  };
  return (
    <div className={classes.root}>
      <InventoryItemsSearchField />
      {renderContent()}
    </div>
  );
};

export default InventoryItems;
