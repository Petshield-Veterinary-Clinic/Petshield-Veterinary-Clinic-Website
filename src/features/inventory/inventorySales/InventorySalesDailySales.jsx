import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DailySalesCard } from "./DailySalesCard";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "grid",
      width: "100%",

      gridGap: "1.5em",
      paddingBottom: "1em",
      [theme.breakpoints.up("sm")]: {
        gridTemplate: "1fr / 1fr 1fr 1fr 1fr 1fr 1fr",
      },
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
  const [computedDailySalesVetSales, setComputedDailySalesVetSales] = useState(
    0
  );
  const [
    computedDailySalesStoreSales,
    setComputedDailySalesStoreSales,
  ] = useState(0);

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
      } else if (val === "VET Sales") {
        setComputedDailySalesVetSales(
          dailySales[val].sales - dailySales[val].incentives
        );
      } else if (val === "Store Sales") {
        setComputedDailySalesStoreSales(
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
    setComputedDailySalesStoreSales,
    setComputedDailySalesVetSales,
  ]);

  return (
    <div className={classes.root}>
      <DailySalesCard title={"Daily Sales"} value={computedDailySales} />
      <DailySalesCard
        title={"Daily Sales - Blood Test"}
        value={computedDailySalesBloodTest}
      />
      <DailySalesCard
        title={"Daily Sales - Grooming"}
        value={computedDailySalesGrooming}
      />
      <DailySalesCard
        title={"Daily Sales - Store Sales"}
        value={computedDailySalesStoreSales}
      />
      <DailySalesCard
        title={"Daily Sales - VET Sales"}
        value={computedDailySalesVetSales}
      />
      <DailySalesCard
        title={"Daily Net Sales "}
        value={
          computedDailySales +
          computedDailySalesBloodTest +
          computedDailySalesGrooming +
          computedDailySalesStoreSales +
          computedDailySalesVetSales
        }
      />
    </div>
  );
};
