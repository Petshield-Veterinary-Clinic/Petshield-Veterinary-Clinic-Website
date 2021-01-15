import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Typography, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InventorySalesCard } from "./InventorySalesCard";

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
  const [computedSales, setComputedSales] = useState(0);
  const [computedSalesBloodTest, setComputedSalesBloodTest] = useState(0);
  const [computedSalesGrooming, setComputedSalesGrooming] = useState(0);
  const [computedSalesVetSales, setComputedSalesVetSales] = useState(0);
  const [computedSalesStoreSales, setComputedSalesStoreSales] = useState(0);
  const [salesTitle, setSalesTitle] = useState("");

  const computeSales = useCallback(() => {
    let totalSales = 0;
    let totalIncentives = 0;
    Object.keys(dailySales).forEach((val) => {
      if (val === "Blood Test") {
        setComputedSalesBloodTest(dailySales[val].netSales);
      } else if (val === "Grooming") {
        setComputedSalesGrooming(dailySales[val].netSales);
      } else if (val === "VET Sales") {
        setComputedSalesVetSales(dailySales[val].netSales);
      } else if (val === "Store Sales") {
        setComputedSalesStoreSales(dailySales[val].netSales);
      } else {
        console.log(dailySales[val]);
        totalSales += dailySales[val].netSales;
      }
    });
    setComputedSales(totalSales - totalIncentives);
  }, [setComputedSales, dailySales]);

  const getSalesTitle = useCallback(() => {
    const title =
      String(metadata.salesDateCateg[0]).toUpperCase() +
      String(metadata.salesDateCateg).substring(
        1,
        metadata.salesDateCateg.length
      );
    setSalesTitle(title);
  }, [setSalesTitle.metadata]);

  useEffect(() => {
    computeSales();
    getSalesTitle();
  }, [computeSales, getSalesTitle]);

  return (
    <div className={classes.root}>
      <InventorySalesCard title={`${salesTitle} Sales`} value={computedSales} />
      <InventorySalesCard
        title={`${salesTitle} Sales - Blood Test`}
        value={computedSalesBloodTest}
      />
      <InventorySalesCard
        title={`${salesTitle} Sales - Grooming`}
        value={computedSalesGrooming}
      />
      <InventorySalesCard
        title={`${salesTitle} Sales - Store Sales`}
        value={computedSalesStoreSales}
      />
      <InventorySalesCard
        title={`${salesTitle} Sales - VET Sales`}
        value={computedSalesVetSales}
      />
      <InventorySalesCard
        title={`${salesTitle} Net Sales `}
        value={
          computedSales +
          computedSalesBloodTest +
          computedSalesGrooming +
          computedSalesStoreSales +
          computedSalesVetSales
        }
      />
    </div>
  );
};
