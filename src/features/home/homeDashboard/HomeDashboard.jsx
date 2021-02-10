import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { HomeSalesStats } from "./homeSalesStats/HomeSalesStats";

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
      },
    },
  };
});

const HomeDashboard = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <HomeSalesStats />
    </Paper>
  );
};

export default HomeDashboard;
