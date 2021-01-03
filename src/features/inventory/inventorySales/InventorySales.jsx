import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { fetchItemSales } from "./inventorySalesSlice";
import InventorySalesTableContainer from "./InventorySalesTable/InventorySalesTableContainer";
import { InventorySalesDailySales } from "./InventorySalesDailySales";
import { InventorySalesDatePicker } from "./InventorySalesDatePicker";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(3),
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
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

const InventorySales = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, itemSales, error } = useSelector(
    (state) => state.inventorySales
  );

  useEffect(() => {
    dispatch(fetchItemSales(""));
  }, [dispatch]);

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
    return (
      <>
        <InventorySalesDailySales />
        <InventorySalesTableContainer itemSales={itemSales} />
      </>
    );
  };

  return (
    <div className={classes.root}>
      <InventorySalesDatePicker />
      {renderContent()}
    </div>
  );
};

export default InventorySales;
