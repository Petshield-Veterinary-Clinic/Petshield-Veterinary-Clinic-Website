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

  const [miscSales, setMiscSales] = useState({
    dailySales: [],
    sales: 0,
  });
  const [bloodTestSales, setBloodTestSales] = useState(0);
  const [groomingSales, setGroomingSales] = useState(0);
  const [vetSales, setVetSales] = useState(0);
  const [storeSales, setStoreSales] = useState(0);
  const [netSales, setNetSales] = useState(0);
  const [salesTitle, setSalesTitle] = useState("");

  const computeSales = useCallback(() => {
    let totalSales = 0;
    let totalNetSales = 0;
    const miscSalesItems = [];
    const salesItems = [];
    Object.keys(dailySales).forEach((val) => {
      if (val === "Blood Test") {
        setBloodTestSales(dailySales[val].netSales);
        totalNetSales += dailySales[val].netSales;
        salesItems.push(dailySales[val].items);
      } else if (val === "Grooming") {
        setGroomingSales(dailySales[val].netSales);
        totalNetSales += dailySales[val].netSales;
        salesItems.push(dailySales[val].items);
      } else if (val === "Vet Sales") {
        setVetSales(dailySales[val].netSales);
        totalNetSales += dailySales[val].netSales;
        salesItems.push(dailySales[val].items);
      } else if (val === "Store Sales") {
        salesItems.push(dailySales[val].items);
        totalNetSales += dailySales[val].netSales;
        setStoreSales(dailySales[val].netSales);
      } else {
        salesItems.push(dailySales[val].items);
        miscSalesItems.push(dailySales[val].items);
        totalSales += dailySales[val].netSales;
      }
    });
    setMiscSales({
      sales: totalSales,
    });
    setNetSales(totalNetSales + totalSales);
  }, [setMiscSales, setNetSales, dailySales]);

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
      <SalesCard
        title={`${salesTitle} Sales`}
        value={miscSales.sales}
        dailySales={dailySales["Misc"]}
      />
      <SalesCard
        title={`${salesTitle} Sales - Blood Test`}
        value={bloodTestSales}
        dailySales={dailySales["Blood Test"]}
      />
      <SalesCard
        title={`${salesTitle} Sales - Grooming`}
        value={groomingSales}
        dailySales={dailySales["Grooming"]}
      />
      <SalesCard
        title={`${salesTitle} Sales - Store Sales`}
        value={storeSales}
        dailySales={dailySales["Store Sales"]}
      />
      <SalesCard
        title={`${salesTitle} Sales - Vet Sales`}
        value={vetSales}
        dailySales={dailySales["Vet Sales"]}
      />
      <SalesCard
        title={`${salesTitle} Net Sales `}
        value={netSales}
        dailySales={dailySales}
      />
    </div>
  );
};
