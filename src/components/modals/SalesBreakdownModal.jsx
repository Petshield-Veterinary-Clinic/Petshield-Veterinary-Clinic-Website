import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import { currencyFormatter } from "../../utils/formatter";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../features/modals/modalSlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    header: {
      display: "grid",
      gridTemplate: " 1fr / 1fr 1fr 1fr 1fr 1fr",
      placeItems: "center",
      fontWeight: "bold",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "1em",
    },
    item: {
      display: "grid",
      gridTemplate: "1fr / 1fr 1fr 1fr 1fr 1fr",
    },
    column: {
      textAlign: "center",
    },
  };
});

export const SalesBreakdownModal = ({
  isVisible,
  title,
  dailySales,
  duration,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isVisible);
  const [breakdown, setBreakdown] = useState({});
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  const generateBreakdown = useCallback(() => {
    let groupedItems = {};
    console.log(dailySales);
    dailySales.items.forEach((v) => {
      const prevValue = groupedItems[v.item.name];
      if (prevValue) {
        groupedItems[v.item.name] = {
          ...groupedItems[v.item.name],
          netSales: prevValue.netSales + v.netSales,
          sales: prevValue.sales + v.sales,
          incentives: prevValue.incentives + v.incentives,
          count: prevValue.count + 1,
        };
      } else {
        groupedItems[v.item.name] = {
          ...groupedItems[v.item.name],
          netSales: v.netSales,
          sales: v.sales,
          incentives: v.incentives,
          count: 1,
        };
      }
    });
    setBreakdown(groupedItems);
  }, [dailySales]);

  useEffect(() => {
    generateBreakdown();
  }, [generateBreakdown]);

  const renderContent = () => {
    if (breakdown) {
      return Object.keys(breakdown).map((key) => {
        const item = breakdown[key];
        return (
          <div key={key} className={classes.item}>
            <div>{key}</div>
            <div className={classes.column}>{item.count}</div>
            <div className={classes.column}>
              {currencyFormatter(item.incentives)}
            </div>
            <div className={classes.column}>
              {currencyFormatter(item.sales)}
            </div>
            <div className={classes.column}>
              {currencyFormatter(item.netSales)}
            </div>
          </div>
        );
      });
    }
    return null;
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth
      TransitionProps={{ onExited: handleOnExited }}
    >
      <DialogTitle
        style={{ textAlign: "center" }}
      >{`${title} Breakdown`}</DialogTitle>
      <DialogContent className={classes.root}>
        <div className={classes.header}>
          <div></div>
          <div>Quantity</div>
          <div>Incentives</div>
          <div>Sales</div>
          <div>Net Sales</div>
        </div>
        <div className={classes.content}>{renderContent()}</div>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleOnClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
