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
  const { dailySales, metadata } = useSelector((state) => state.inventorySales);
  const [computedDailySales, setComputedDailySales] = useState(0);
  const [
    computedDailySalesBloodTest,
    setComputedDailySalesBloodTest,
  ] = useState(0);
  const [comptedSalesGrooming, setComputedSalesGrooming] = useState(0);
  const [computedSalesVetSales, setComputedSalesVetSales] = useState(0);
  const [computedSalesStoreSales, setComputedSalesStoreSales] = useState(0);
  const salesTitle =
    String(metadata.salesDateCateg[0]).toUpperCase() +
    String(metadata.salesDateCateg).substring(
      1,
      metadata.salesDateCateg.length
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
        setComputedSalesGrooming(
          dailySales[val].sales - dailySales[val].incentives
        );
      } else if (val === "VET Sales") {
        setComputedSalesVetSales(
          dailySales[val].sales - dailySales[val].incentives
        );
      } else if (val === "Store Sales") {
        setComputedSalesStoreSales(
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
    setComputedSalesGrooming,
    setComputedSalesStoreSales,
    setComputedSalesVetSales,
  ]);

  return (
    <div className={classes.root}>
      <DailySalesCard
        title={`${salesTitle} Sales`}
        value={computedDailySales}
      />
      <DailySalesCard
        title={`${salesTitle} Sales - Blood Test`}
        value={computedDailySalesBloodTest}
      />
      <DailySalesCard
        title={`${salesTitle} Sales - Grooming`}
        value={comptedSalesGrooming}
      />
      <DailySalesCard
        title={`${salesTitle} Sales - Store Sales`}
        value={computedSalesStoreSales}
      />
      <DailySalesCard
        title={`${salesTitle} Sales - VET Sales`}
        value={computedSalesVetSales}
      />
      <DailySalesCard
        title={`${salesTitle} Net Sales `}
        value={
          computedDailySales +
          computedDailySalesBloodTest +
          comptedSalesGrooming +
          computedSalesStoreSales +
          computedSalesVetSales
        }
      />
    </div>
  );
};
