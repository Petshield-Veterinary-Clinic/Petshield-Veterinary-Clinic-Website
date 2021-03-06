import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, TextField, Hidden } from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";
import moment from "moment";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1em",
      marginBottom: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        gap: "0",
      },
    },
    picker: {
      height: "100% !important",
    },
  };
});

export const SalesDatePicker = ({
  onSalesDateChanged,
  onSalesDateCategChanged,
}) => {
  const classes = useStyles();
  const currentDate = moment(Date.now()).format("MM-DD-YYYY");

  const datePickerViews = {
    daily: ["date"],
    monthly: ["month", "year"],
    yearly: ["year"],
  };

  const [selectedSalesDateCateg, setSelectedSalesDateCateg] = useState("daily");
  const [selectedSalesDate, setSelectedSalesDate] = useState(currentDate);

  const handleOnSalesDateCategChanged = (value) => {
    setSelectedSalesDateCateg(value);
    onSalesDateCategChanged({
      salesDate: selectedSalesDate,
      salesDateCateg: value,
    });
  };

  const handleOnSalesDateChanged = (date) => {
    const formattedDate = date.format("MM-DD-YYYY").toString();
    setSelectedSalesDate(formattedDate);
    onSalesDateChanged({
      salesDate: formattedDate,
      salesDateCateg: selectedSalesDateCateg,
    });
  };

  const renderPicker = () => {
    if (selectedSalesDateCateg === "overall") {
      return null;
    }

    return (
      <DatePicker
        value={selectedSalesDate}
        views={datePickerViews[selectedSalesDateCateg]}
        allowKeyboardControl={false}
        renderInput={(params) => (
          <>
            <Hidden smUp>
              <TextField
                fullWidth
                {...params}
                helperText={""}
                variant="outlined"
              />
            </Hidden>
            <Hidden smDown>
              <TextField {...params} helperText={""} variant="outlined" />
            </Hidden>
          </>
        )}
        onChange={(value) => {
          handleOnSalesDateChanged(value);
        }}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Hidden smUp>
        <Select
          variant="outlined"
          value={selectedSalesDateCateg}
          fullWidth
          onChange={(e) => handleOnSalesDateCategChanged(e.target.value)}
        >
          <MenuItem value="overall">All</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
        </Select>
      </Hidden>
      <Hidden smDown>
        <Select
          variant="outlined"
          value={selectedSalesDateCateg}
          onChange={(e) => handleOnSalesDateCategChanged(e.target.value)}
        >
          <MenuItem value="overall">All</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
        </Select>
      </Hidden>
      {renderPicker()}
    </div>
  );
};
