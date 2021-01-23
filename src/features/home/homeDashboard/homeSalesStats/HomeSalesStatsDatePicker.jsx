import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, TextField } from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fetchItemSalesStats } from "./homeSalesStatsSlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});
export const HomeSalesStatsDatePicker = ({
  setSalesDateCateg,
  salesDateCateg,
  salesDate,
  setSalesDate,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const datePickerViews = {
    monthly: ["month", "year"],
    yearly: ["year"],
  };

  const handleSalesDateChanged = (val) => {
    setSalesDate(moment(val).format("MM-DD-YYYY"));
  };

  const handleSalesDateCategChanged = ({ target: { value } }) => {
    setSalesDateCateg(value);
  };

  useEffect(() => {
    dispatch(fetchItemSalesStats(salesDate, salesDateCateg));
  }, [dispatch, salesDate, salesDateCateg]);

  return (
    <div className={classes.root}>
      <Select
        value={salesDateCateg}
        onChange={handleSalesDateCategChanged}
        variant="outlined"
      >
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="yearly">Yearly</MenuItem>
      </Select>
      <DatePicker
        value={salesDate}
        allowKeyboardControl={false}
        renderInput={(params) => (
          <TextField {...params} helperText={""} variant="outlined" />
        )}
        views={datePickerViews[salesDateCateg]}
        onChange={handleSalesDateChanged}
      ></DatePicker>
    </div>
  );
};
