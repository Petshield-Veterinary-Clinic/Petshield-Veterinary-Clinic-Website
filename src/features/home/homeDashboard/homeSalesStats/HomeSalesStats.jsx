import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import { HomeSalesStatsDatePicker } from "./HomeSalesStatsDatePicker";
import { HomeSalesStatsGraph } from "./HomeSalesStatsGraph";
import moment from "moment";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        flexDirection: "column",
      },
    },
    graphWrapper: {},
    title: {
      margin: `${theme.spacing(2)} 0`,
    },
  };
});

export const HomeSalesStats = () => {
  const currentDate = moment(Date.now()).format("MM-DD-YYYY");
  const [salesDateCateg, setSalesDateCateg] = useState("monthly");
  const [salesDate, setSalesDate] = useState(currentDate);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <HomeSalesStatsDatePicker
        salesDate={salesDate}
        setSalesDate={setSalesDate}
        salesDateCateg={salesDateCateg}
        setSalesDateCateg={setSalesDateCateg}
      />
      <Typography
        variant="h5"
        align="center"
        className={classes.title}
      >{`${salesDateCateg.toUpperCase()} Sales`}</Typography>
      <div className={classes.graphWrapper}>
        <HomeSalesStatsGraph />
      </div>
    </Card>
  );
};
