import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../features/modals/modalSlice";
import { currencyFormatter } from "../../utils/formatter";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25em",
    },
    header: {
      display: "grid",
      gridTemplate: " 1fr / 1fr 1fr 1fr 1fr 1fr",
      placeItems: "center",
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
    headerTitle: {
      fontSize: "1.4rem",
      fontWeight: "bold",
      textAlign: "center",
    },
    footer: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "column",
      gap: "1em",
      fontSize: "0.9rem",
      "& span": {
        fontWeight: "bold",
      },
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

export const NetSalesBreakdownModal = ({ isVisible, title, dailySales }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isVisible);
  const [breakdowns, setBreakdowns] = useState({});
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  const generateBreakdown = useCallback(() => {
    let breakdowns = {};
    Object.keys(dailySales).forEach((key) => {
      let groupedItems = {};
      const dailySale = dailySales[key];
      dailySale.items.forEach((v) => {
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
      breakdowns[key] = {
        items: groupedItems,
        sales: dailySales[key].sales,
        netSales: dailySales[key].netSales,
        incentives: dailySales[key].incentives,
      };
    });
    setBreakdowns(breakdowns);
  }, [dailySales]);

  useEffect(() => {
    generateBreakdown();
  }, [generateBreakdown]);

  const renderContent = () => {
    if (breakdowns) {
      return Object.keys(breakdowns).map((key) => {
        const breakdownItem = breakdowns[key];
        return (
          <>
            <div className={classes.headerTitle}>{key}</div>
            <div className={classes.header}>
              <div></div>
              <div>Quantity</div>
              <div>Incentives</div>
              <div>Sales</div>
              <div>Net Sales</div>
            </div>
            <div className={classes.content}>
              {Object.keys(breakdownItem.items).map((key) => {
                const item = breakdownItem.items[key];
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
              })}
            </div>
            <div className={classes.footer}>
              <div>
                Total Incentives:
                <span>{currencyFormatter(breakdownItem.incentives)}</span>
              </div>
              <div>
                Total Sales:
                <span>{currencyFormatter(breakdownItem.sales)}</span>
              </div>
              <div>
                Total Net Sales:
                <span>{currencyFormatter(breakdownItem.netSales)}</span>
              </div>
            </div>
          </>
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
      <DialogContent className={classes.root}>{renderContent()}</DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleOnClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
