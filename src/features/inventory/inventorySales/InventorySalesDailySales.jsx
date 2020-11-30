import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "grid",
      width: "100%",
      gridTemplate: "1fr / 1fr 1fr 1fr",
      gridGap: "1em",
      paddingBottom: "1em",
    },
    dailySalesCard: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid green",
      padding: "1em",
      borderRadius: "10px",
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

  useEffect(() => {
    let totalSales = 0;
    let totalIncentives = 0;
    Object.keys(dailySales).forEach((val) => {
      if (val !== "Blood Test") {
        totalSales += dailySales[val].sales;
        totalIncentives += dailySales[val].incentives;
      } else {
        setComputedDailySalesBloodTest(
          dailySales[val].sales - dailySales[val].incentives
        );
      }
    });
    setComputedDailySales(totalSales - totalIncentives);
  }, [dailySales, setComputedDailySales, setComputedDailySalesBloodTest]);

  return (
    <div className={classes.root}>
      <Card className={classes.dailySalesCard}>
        <Typography style={{ fontWeight: "bold" }}>Daily Sales</Typography>
        <Typography>{`P${Number(computedDailySales).toFixed(2)}`}</Typography>
      </Card>
      <Card className={classes.dailySalesCard}>
        <Typography style={{ fontWeight: "bold" }}>
          Daily Sales - Blood Test
        </Typography>
        <Typography>{`P${Number(computedDailySalesBloodTest).toFixed(
          2
        )}`}</Typography>
      </Card>
      <Card className={classes.dailySalesCard}>
        <Typography style={{ fontWeight: "bold" }}>Net Daily Sales</Typography>
        <Typography>{`P${Number(
          computedDailySalesBloodTest + computedDailySales
        ).toFixed(2)}`}</Typography>
      </Card>
    </div>
  );
};
