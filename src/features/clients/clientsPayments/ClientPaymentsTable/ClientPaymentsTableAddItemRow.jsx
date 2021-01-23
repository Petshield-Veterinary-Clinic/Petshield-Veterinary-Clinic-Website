import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  CircularProgress,
  TableCell,
  TableRow,
  Button,
  Autocomplete,
} from "@material-ui/core";

import { addClientPayment, fetchClients } from "../../clientsSlice";
import {
  searchItems,
  clearItemsSearch,
} from "../../../inventory/inventorySearchSlice";
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
      gridTemplateColumns: "1fr / 1fr",
      gridGap: theme.spacing(1),
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

export const ClientPaymentsTableAddItemRow = ({
  showAddItemSaleRow,
  toggleAddItemSaleRow,
  selectedClient,
  setSelectedClient,
}) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const currentDate = moment(Date.now()).format("MM-DD-YYYY");
  const { result, isLoading } = useSelector((state) => state.inventorySearch);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

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
    setSelectedClient({});
    setSelectedItem({});
    setQuantity(1);
  };

  const onSubmitPressed = () => {
    dispatch(addClientPayment(selectedClient.ID, selectedItem.ID, quantity));
    resetValues();
    dispatch(clearItemsSearch());
    toggleAddItemSaleRow(false);
  };

  const onCancelPressed = () => {
    resetValues();
    dispatch(clearItemsSearch());
    toggleAddItemSaleRow(false);
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
        <TableCell>₱{Number(selectedItem.price).toFixed(2)}</TableCell>
        <TableCell className={classes.quantityCell}>
          <TextField
            size="small"
            variant="outlined"
            type="number"
            value={quantity}
            margin="dense"
            onChange={handleOnQuantityChange}
          ></TextField>
        </TableCell>
        <TableCell>₱{Number(sales).toFixed(2)}</TableCell>
        <TableCell>
          {`${Number(selectedItem.incentiveRate).toFixed(2)}%`}
        </TableCell>
        <TableCell>
          {selectedItem.isIncentiveFixed
            ? `₱${Number(selectedItem.incentiveAmount).toFixed(2)}`
            : `₱${Number(sales * (selectedItem.incentiveRate / 100)).toFixed(
                2
              )}`}
        </TableCell>
        <TableCell>₱{Number(netSales).toFixed(2)}</TableCell>
        <TableCell>{selectedItem.category}</TableCell>
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

  const renderItemField = () => {
    if (Object.keys(selectedClient).length === 0) {
      return "Select a client first";
    }

    return (
      <>
        <Autocomplete
          loading={isLoading}
          options={result.filter((item) => item.inStock > 0)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product Name"
              size="small"
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
        {selectedItem.name}
      </>
    );
  };

  return (
    <TableRow className={classes.root}>
      <TableCell>{currentDate}</TableCell>
      <TableCell>{selectedClient.clientName}</TableCell>
      <TableCell>{renderItemField()}</TableCell>
      {renderItemDetails()}
    </TableRow>
  );
};
