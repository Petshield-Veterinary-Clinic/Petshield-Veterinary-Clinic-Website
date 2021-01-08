import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "150px",
      alignItems: "center",
      padding: "1em",
      backgroundColor: "#1D1D1D",
      "&::before": {
        content: '" "',
        position: "absolute",
        backgroundColor: theme.palette.primary.main,
        height: "8px",
        width: "50%",
        top: "-3px",
        borderRadius: "20px",
      },
    },
  };
});

export const DailySalesCard = ({ title, value }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={0}>
      <Typography style={{ fontWeight: "bold" }} align="center">
        {title}
      </Typography>
      <Typography>{`P${Number(value).toFixed(2)}`}</Typography>
    </Card>
  );
};
