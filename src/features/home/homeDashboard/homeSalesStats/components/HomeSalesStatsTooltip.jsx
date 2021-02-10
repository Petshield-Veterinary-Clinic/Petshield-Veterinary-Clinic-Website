import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { currencyFormatter } from "../../../../../utils/formatter";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(2),
    },
  };
});

export const HomeSalesStatsToolip = ({ payload, active }) => {
  const classes = useStyles();
  if (active && payload) {
    const title = payload[0].payload["name"];
    const value = payload[0].payload["sales"];

    const renderData = () => {
      if (Object.keys(value).length !== 0) {
        const filteredSales = Object.keys(value)
          .filter((key) => key !== "Net Sales")
          .map((key) => {
            return (
              <Typography key={key}>{`${key}: ${currencyFormatter(
                value[key]
              )}`}</Typography>
            );
          });
        return (
          <>
            {filteredSales}
            <Typography>
              {`Net Sales: ${
                value["Net Sales"] !== undefined
                  ? currencyFormatter(value["Net Sales"])
                  : 0
              }`}
            </Typography>
          </>
        );
      }

      return <Typography>No Sales</Typography>;
    };

    return (
      <Card className={classes.root}>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        <br />
        {renderData()}
      </Card>
    );
  }
  return null;
};
