import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

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
  };
});
const ClientsPayments = () => {
  const classes = useStyles();
  return <Paper className={classes.root}></Paper>;
};

export default ClientsPayments;
