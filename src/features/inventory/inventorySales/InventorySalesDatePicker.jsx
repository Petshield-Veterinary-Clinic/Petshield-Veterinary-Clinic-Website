import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchItemSales } from "./inventorySalesSlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: theme.spacing(1),
    },
  };
});

export const InventorySalesDatePicker = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentDate = moment(Date.now()).format("MM-DD-YYYY");

  const [selectedSalesDate, setSelectedSalesDate] = useState("");
  const { metadata } = useSelector((state) => state.inventorySales);
  const salesDatesValues = metadata !== null ? [...metadata.dates] : [];

  const handleOnSalesDateChanged = (e) => {
    const value = e.target.value;
    setSelectedSalesDate(value);
    dispatch(fetchItemSales(value));
  };

  const renderContent = () => {
    if (salesDatesValues.length !== 0) {
      return (
        <Select
          className={classes.root}
          variant="outlined"
          value={selectedSalesDate !== "" ? selectedSalesDate : "all"}
          onChange={handleOnSalesDateChanged}
        >
          <MenuItem key="all" value="all">
            All
          </MenuItem>
          {salesDatesValues.map((saleDate) => (
            <MenuItem key={saleDate} value={saleDate}>
              {saleDate === currentDate ? `Today` : saleDate}
            </MenuItem>
          ))}
        </Select>
      );
    } else {
      return (
        <Select
          className={classes.root}
          variant="outlined"
          value={selectedSalesDate !== "" ? selectedSalesDate : "all"}
          onChange={handleOnSalesDateChanged}
        >
          <MenuItem key="all" value="all">
            All
          </MenuItem>
          <MenuItem
            key={currentDate}
            value={currentDate}
            onChange={handleOnSalesDateChanged}
          >
            Today
          </MenuItem>
        </Select>
      );
    }
  };

  return <div className={classes.root}>{renderContent()}</div>;
};
