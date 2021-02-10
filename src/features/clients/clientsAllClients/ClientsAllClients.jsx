import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Paper } from "@material-ui/core";

import { fetchClients } from "../clientsSlice";
import { ClientsAllClientsList } from "./ClientsAllClientsList";
import { ClientsAllClientsHeader } from "./ClientsAllClientListHeader";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(3),
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
      paddingTop: "83px",
      [theme.breakpoints.up("sm")]: {
        height: "100vh",
        overflow: "hidden",
      },
    },
    loadingIndicator: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});
const ClientsAllClients = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { clients, isClientsLoading } = useSelector((state) => state.clients);
  const [clientsSearchResult, setClientsSearchResult] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  const renderContent = () => {
    if (!isClientsLoading) {
      return (
        <>
          <ClientsAllClientsList
            clients={clientsSearchResult ? clientsSearchResult : clients}
          />
        </>
      );
    }
    return (
      <div className={classes.loadingIndicator}>
        <CircularProgress />
      </div>
    );
  };

  return (
    <Paper className={classes.root}>
      <ClientsAllClientsHeader
        setClientResultsSearch={setClientsSearchResult}
      />
      {renderContent()}
    </Paper>
  );
};

export default ClientsAllClients;
