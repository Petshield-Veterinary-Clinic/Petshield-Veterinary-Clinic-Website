import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SalesCard } from "./SalesCard";

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

export const SalesStats = ({ dailySales, metadata }) => {
  const classes = useStyles();

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
  }, [setSalesTitle, metadata]);

  useEffect(() => {
    computeSales();
    getSalesTitle();
  }, [computeSales, getSalesTitle]);

  return (
    <div className={classes.root}>
      <SalesCard title={`${salesTitle} Sales`} value={computedSales} />
      <SalesCard
        title={`${salesTitle} Sales - Blood Test`}
        value={computedSalesBloodTest}
      />
      <SalesCard
        title={`${salesTitle} Sales - Grooming`}
        value={computedSalesGrooming}
      />
      <SalesCard
        title={`${salesTitle} Sales - Store Sales`}
        value={computedSalesStoreSales}
      />
      <SalesCard
        title={`${salesTitle} Sales - VET Sales`}
        value={computedSalesVetSales}
      />
      <SalesCard
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
