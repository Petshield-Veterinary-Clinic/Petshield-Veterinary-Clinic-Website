import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "grid",
      width: "100%",

      gridGap: "1.5em",
      paddingBottom: "1em",
      [theme.breakpoints.up("sm")]: {
        gridTemplate: "1fr / 1fr 1fr 1fr 1fr",
      },
    },
    dailySalesCard: {
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
      // Inline Indicator
      // boxShadowInset: "0px 0px 0px 10px #000",
    },
  };
});

export const InventorySalesDailySales = () => {
  const classes = useStyles();
  const { dailySales } = useSelector((state) => state.inventorySales);
  const [computedDailySales, setComputedDailySales] = useState(0);
  const [
    computedDailySalesBloodTest,
    setComputedDailySalesBloodTest,
  ] = useState(0);
  const [computedDailySalesGrooming, setComputedDailySalesGrooming] = useState(
    0
  );

  useEffect(() => {
    let totalSales = 0;
    let totalIncentives = 0;
    Object.keys(dailySales).forEach((val) => {
      if (val === "Blood Test") {
        setComputedDailySalesBloodTest(
          dailySales[val].sales - dailySales[val].incentives
        );
      } else if (val === "Grooming") {
        setComputedDailySalesGrooming(
          dailySales[val].sales - dailySales[val].incentives
        );
      } else {
        totalSales += dailySales[val].sales;
        totalIncentives += dailySales[val].incentives;
      }
    });
    setComputedDailySales(totalSales - totalIncentives);
  }, [
    dailySales,
    setComputedDailySales,
    setComputedDailySalesBloodTest,
    setComputedDailySalesGrooming,
  ]);

  return (
    <div className={classes.root}>
      <Card className={classes.dailySalesCard} elevation={0}>
        <Typography style={{ fontWeight: "bold" }}>Daily Sales</Typography>
        <Typography>{`P${Number(computedDailySales).toFixed(2)}`}</Typography>
      </Card>
      <Card className={classes.dailySalesCard} elevation={1}>
        <Typography style={{ fontWeight: "bold" }}>
          Daily Sales - Blood Test
        </Typography>
        <Typography>{`P${Number(computedDailySalesBloodTest).toFixed(
          2
        )}`}</Typography>
      </Card>{" "}
      <Card className={classes.dailySalesCard} elevation={1}>
        <Typography style={{ fontWeight: "bold" }}>
          Daily Sales - Grooming
        </Typography>
        <Typography>{`P${Number(computedDailySalesGrooming).toFixed(
          2
        )}`}</Typography>
      </Card>
      <Card className={classes.dailySalesCard} elevation={1}>
        <Typography style={{ fontWeight: "bold" }}>Net Daily Sales</Typography>
        <Typography>{`P${Number(
          computedDailySalesBloodTest + computedDailySales
        ).toFixed(2)}`}</Typography>
      </Card>
    </div>
  );
};
