import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { fetchAllClientPayments } from "../clientsSlice";
import ClientPaymentsTableContainer from "./ClientPaymentsTable/ClientPaymentsTableContainer";

import moment from "moment";
import { SalesStats, SalesDatePicker } from "../../../components/sales";

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

const ClientPayments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isPaymentsLoading, clientPayments, error } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    const currentDate = moment(Date.now()).format("MM-DD-YYYY");
    dispatch(
      fetchAllClientPayments({
        salesDate: currentDate,
        salesDateCateg: "daily",
      })
    );
  }, [dispatch]);

  const handleOnSalesDateChanged = (value) => {
    dispatch(fetchAllClientPayments(value));
  };
  const handleOnSalesDateCategChanged = (value) => {
    dispatch(fetchAllClientPayments(value));
  };

  const renderContent = () => {
    if (Object.keys(clientPayments).length !== 0 && !isPaymentsLoading) {
      return (
        <>
          <SalesStats
            metadata={clientPayments.metadata}
            dailySales={clientPayments.dailySales}
          />
          <ClientPaymentsTableContainer
            itemSales={clientPayments.itemSales ? clientPayments.itemSales : []}
          />
        </>
      );
    }
    if (error) {
      return <div>An Error has occured!</div>;
    }
    return (
      <div className={classes.loadingIndicator}>
        <CircularProgress color="secondary" />
      </div>
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

export default ClientPayments;
