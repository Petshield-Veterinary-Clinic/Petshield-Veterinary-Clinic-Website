import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Paper } from "@material-ui/core";
import { ConsultationsCard } from "./ConsultationsCard";
import { AdmittancesCard } from "./AdmittancesCard";

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
    container: {
      display: "grid",
      gridTemplate: "1fr / 1fr 1fr",
      gridGap: theme.spacing(3),
    },
  };
});

const HomePetQueues = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.container}>
        <ConsultationsCard />
        <AdmittancesCard />
      </div>
    </Paper>
  );
};

export default HomePetQueues;
