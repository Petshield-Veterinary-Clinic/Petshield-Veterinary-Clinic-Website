import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Paper } from "@material-ui/core";

import { fetchClients } from "../clientsSlice";
import { ClientsAllClientsList } from "./ClientsAllClientsList";
import { ClientsAllClientsHeader } from "./ClientsAllClientListHeader";
import Fuse from "fuse.js";

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
      overflow: "hidden",
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

  // Create fuzzy text search
  const options = useMemo(() => {
    return {
      includeScore: true,
      keys: ["clientName"],
    };
  }, []);

  const fuse = useMemo(() => new Fuse(clients, options), [clients, options]);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const renderContent = () => {
    if (!isClientsLoading) {
      return (
        <>
          <ClientsAllClientsHeader
            setClientResultsSearch={setClientsSearchResult}
            fuse={fuse}
          />
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

  return <Paper className={classes.root}>{renderContent()}</Paper>;
};

export default ClientsAllClients;
