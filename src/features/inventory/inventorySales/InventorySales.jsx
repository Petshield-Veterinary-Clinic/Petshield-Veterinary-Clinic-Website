import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { fetchItemSales } from "./inventorySalesSlice";
import InventorySalesTableContainer from "./InventorySalesTable/InventorySalesTableContainer";
import moment from "moment";
import { SalesDatePicker, SalesStats } from "../../../components/sales";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(3),

      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
      paddingTop: "83px",

      [theme.breakpoints.up("sm")]: {
        height: "100vh",
      },
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
  const currentDate = moment(Date.now()).format("MM-DD-YYYY");
  const [salesDate, setSalesDate] = useState(currentDate);
  const { isLoading, itemSales, dailySales, metadata, error } = useSelector(
    (state) => state.inventorySales
  );

  useEffect(() => {
    dispatch(fetchItemSales({ salesDate: salesDate, salesDateCateg: "daily" }));
  }, [dispatch, salesDate]);

  const handleOnSalesDateChanged = (value) => {
    setSalesDate(value.salesDate);
    dispatch(fetchItemSales(value));
  };
  const handleOnSalesDateCategChanged = (value) => {
    dispatch(fetchItemSales(value));
  };

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
        <SalesStats metadata={metadata} dailySales={dailySales} />
        <InventorySalesTableContainer
          itemSales={itemSales}
          salesDate={salesDate}
        />
      </>
    );
  };

  return (
    <div className={classes.root}>
      <SalesDatePicker
        onSalesDateCategChanged={handleOnSalesDateCategChanged}
        onSalesDateChanged={handleOnSalesDateChanged}
      />
      {renderContent()}
    </div>
  );
};

export default InventorySales;
