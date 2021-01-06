import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  Autocomplete,
  TextField,
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
  InputAdornment,
  Divider,
  Button,
} from "@material-ui/core";
import { addItemSale } from "../inventorySalesSlice";
import { searchItems, clearItemsSearch } from "../../inventorySearchSlice";
import { Check, Cancel } from "@material-ui/icons";
import { debounce } from "lodash";
import moment from "moment";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100%",
    },
    loadingIndicator: {
      width: "10px",
      height: "10px",
    },
    quantityCell: {},
    buttonRows: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "1em",
    },
    submitButton: {
      borderColor: "green",
      color: "green",
    },
    cancelButton: {
      borderColor: "red",
      color: "red",
    },
  };
});

export const InventorySalesTableAddItemRow = ({
  showAddItemSaleRow,
  toggleAddItemSaleRow,
}) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const currentDate = moment(Date.now()).format("MM-DD-YYYY");
  const { result, isLoading, error } = useSelector(
    (state) => state.inventorySearch
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  // Only show this row when the user pressed the add item button
  if (!showAddItemSaleRow) {
    return null;
  }

  const handleOnQuantityChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= Number.parseInt(selectedItem.inStock)) {
      setQuantity(value);
    }
  };
  const resetValues = () => {
    setSelectedItem({});
    setQuantity(1);
  };

  const onSubmitPressed = () => {
    dispatch(addItemSale(selectedItem.ID, quantity));
    resetValues();
    dispatch(clearItemsSearch());
    toggleAddItemSaleRow(false);
  };

  const onCancelPressed = () => {
    resetValues();
    dispatch(clearItemsSearch());
    toggleAddItemSaleRow(false);
  };

  const renderItemDetails = () => {
    // Compute Net Sales
    let sales = selectedItem.price * quantity;
    let netSales = sales;

    if (selectedItem.isIncentiveFixed) {
      netSales -= selectedItem.incentiveAmount;
    } else {
      netSales -= selectedItem.price * selectedItem.incentiveRate;
    }

    if (Object.keys(selectedItem).length === 0) {
      return null;
    }

    return (
      <>
        <TableCell className={classes.quantityCell}>
          <TextField
            size="small"
            variant="outlined"
            type="number"
            value={quantity}
            onChange={handleOnQuantityChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  /<Typography>{selectedItem.inStock}</Typography>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Divider orientation="vertical" flexItem></Divider>
        </TableCell>
        <TableCell>
          <Typography>₱{Number(sales).toFixed(2)}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {selectedItem.isIncentiveFixed
              ? `₱${Number(selectedItem.incentiveAmount).toFixed(2)}`
              : `${Number(selectedItem.incentiveRate).toFixed(2)}%`}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>₱{Number(netSales).toFixed(2)}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{currentDate}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{selectedItem.salesCategory}</Typography>
        </TableCell>
        <TableCell>
          <div className={classes.buttonRows}>
            <Button
              className={classes.submitButton}
              variant="outlined"
              onClick={onSubmitPressed}
            >
              <Check />
            </Button>
            <Button
              className={classes.cancelButton}
              variant="outlined"
              onClick={onCancelPressed}
            >
              <Cancel />
            </Button>
          </div>
        </TableCell>
      </>
    );
  };

  const search = (searchTerm) => {
    if (searchTerm === "") {
      dispatch(clearItemsSearch());
    } else {
      dispatch(searchItems(searchTerm));
    }
  };

  const debouncedSearch = debounce(search, 800);

  const handleOnSearchTermChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <TableRow className={classes.root}>
      <TableCell>
        <Autocomplete
          loading={isLoading}
          options={result.filter((item) => item.inStock > 0)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Item Name"
              variant="outlined"
              onChange={handleOnSearchTermChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="secondary" size="1.5rem" />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          onChange={(_, data, reason) => {
            if (reason === "select-option") {
              setSelectedItem(data);
            }
          }}
        />
      </TableCell>
      {renderItemDetails()}
    </TableRow>
  );
};
