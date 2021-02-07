import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
  Button,
  Autocomplete,
} from "@material-ui/core";
import { addItemSale } from "../inventorySalesSlice";
import { searchItems, clearItemsSearch } from "../../inventorySearchSlice";
import { Check, Cancel } from "@material-ui/icons";
import { debounce } from "lodash";

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
      gridTemplateColumns: "1fr / 1fr",
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
  salesDate,
}) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { result, isLoading } = useSelector((state) => state.inventorySearch);

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

    const incentiveAmount = selectedItem.isIncentiveFixed
      ? Number(selectedItem.incentiveAmount).toFixed(2)
      : Number(sales * (selectedItem.incentiveRate / 100)).toFixed(2);
    const netSales = sales - incentiveAmount;

    if (Object.keys(selectedItem).length === 0) {
      return null;
    }

    return (
      <>
        <TableCell>
          <Typography>₱{Number(selectedItem.price).toFixed(2)}</Typography>
        </TableCell>
        <TableCell className={classes.quantityCell}>
          <TextField
            size="small"
            variant="outlined"
            type="number"
            value={quantity}
            onChange={handleOnQuantityChange}
            fullWidth
          ></TextField>
        </TableCell>
        <TableCell>
          <Typography>₱{Number(sales).toFixed(2)}</Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {`${Number(selectedItem.incentiveRate).toFixed(2)}%`}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>
            {selectedItem.isIncentiveFixed
              ? `₱${Number(selectedItem.incentiveAmount).toFixed(2)}`
              : `₱${Number(sales * (selectedItem.incentiveRate / 100)).toFixed(
                  2
                )}`}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>₱{Number(netSales).toFixed(2)}</Typography>
        </TableCell>

        <TableCell>
          <Typography>{selectedItem.category}</Typography>
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
        <Typography>{salesDate}</Typography>
      </TableCell>
      <TableCell>
        <Autocomplete
          loading={isLoading}
          options={result.filter((item) => item.inStock > 0)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Product Name"
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
