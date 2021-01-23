import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../clientsSlice";
import ClientAppointmentsScheduler from "./ClientAppointmentsScheduler/ClientAppointmentsSchedulerContainer";

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
const ClientsAppointments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAppointmentsLoading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const renderContent = () => {
    if (isAppointmentsLoading) {
      return (
        <div className={classes.loadingIndicator}>
          <CircularProgress />
        </div>
      );
    }
    return <ClientAppointmentsScheduler />;
  };

  return <Card className={classes.root}>{renderContent()}</Card>;
};

export default ClientsAppointments;
