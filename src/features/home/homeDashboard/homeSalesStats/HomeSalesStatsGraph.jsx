import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { CircularProgress } from "@material-ui/core";
import { HomeSalesStatsToolip } from "./components/HomeSalesStatsTooltip";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      gridGap: "1em",
    },
    tooltip: {
      backgroundColor: "red",
    },
  };
});
export const HomeSalesStatsGraph = () => {
  const classes = useStyles();
  const { isLoading, stats } = useSelector((state) => state.homeSalesStats);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const pieColors = {
      Grooming: "#8884D8",
      "Vet Sales": "#8CDEDC",
      "Store Sales": "#B2ECE1",
      "Blood Test": "#D295BF",
      default: "#DE9151",
    };

    if (Object.keys(stats).length !== 0) {
      const data = stats.data.map((item) => {
        return {
          name: item.category,
          sales: item.value,
          netSales:
            item.value["Net Sales"] !== undefined ? item.value["Net Sales"] : 0,
        };
      });

      let pieMap = {};

      for (let i = 0; i < stats.data.length; i++) {
        if (Object.keys(stats.data[i].value).length !== 0) {
          Object.keys(stats.data[i].value)
            .filter((key) => key !== "Net Sales")
            .forEach((key) => {
              if (!pieMap[key]) {
                pieMap[key] = 0;
              }
              pieMap[key] += stats.data[i].value[key];
            });
        }
      }
      const pieData = Object.keys(pieMap).map((key) => {
        return {
          name: key,
          value: pieMap[key],
          fill:
            pieColors[key] !== undefined
              ? pieColors[key]
              : pieColors["default"],
        };
      });

      setPieData(pieData);
      setLineData(data);
    }
  }, [stats, isLoading, setPieData, setLineData]);

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (lineData.length !== 0) {
      return (
        <>
          <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" type="category" />
              <YAxis type="number" dataKey="netSales" name="Net Sales" />
              <Tooltip content={<HomeSalesStatsToolip />} />
              <Legend />
              <Line type="monotone" dataKey="netSales" />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width={"100%"} height={400}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={pieData} dataKey="value" />
            </PieChart>
          </ResponsiveContainer>
        </>
      );
    }
    return null;
  };
  return <div className={classes.root}>{renderContent()}</div>;
};
