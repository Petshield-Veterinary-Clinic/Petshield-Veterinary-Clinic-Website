import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Autocomplete,
  Fade,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../modals/modalSlice";
import { useForm, Controller } from "react-hook-form";
import { addItemSale } from "../inventorySales/inventorySalesSlice";
import { searchItems, clearItemsSearch } from "../inventorySearchSlice";
import { debounce } from "lodash";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => {
  return {
    form: {
      display: "grid",
      width: "100%",
      gridTemplate: "1fr 1fr / 1fr",
      gridGap: "1em",
      [theme.breakpoints.up("sm")]: {
        gridTemplate: "1fr / 1fr 0.05fr",
        gridGap: "1em",
      },
    },
    itemDetailsWrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      paddingTop: "1em",
      gridGap: "1em",

      [theme.breakpoints.up("sm")]: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        placeContent: "center",
        padding: "1em 5em",
      },
    },
    itemDetail: {
      border: "2px solid green",
      borderRadius: "5px",
      borderColor: theme.palette.secondary.main,
      padding: "1em",
    },
    itemLabel: {
      textAlign: "center",
      borderBottom: "2px solid green",
      borderColor: theme.palette.secondary.main,
      borderRadius: "5px",
      margin: "0 2em",
      padding: "0 1em",
      fontSize: "1rem",
      fontWeight: "bold",
      textTransform: "UPPERCASE",
    },
    itemContent: {
      textAlign: "center",
      padding: "0.5em",
    },
    itemReduce: {
      color: "red",
      fontSize: "1rem",
      fontWeight: "bold",
    },
    discounted: {
      color: `${blue[400]} !important`,
    },
    addTransactionFormField: {
      margin: "0.5em",
    },
  };
});

export const InventoryAddSaleModal = ({ isVisible }) => {
  const [open, setOpen] = useState(isVisible);

  const [selectedItem, setSelectedItem] = useState({});
  const [itemQuantity, setItemQuantity] = useState(1);
  const { result, isLoading, error } = useSelector(
    (state) => state.inventorySearch
  );
  const classes = useStyles(selectedItem);
  const dispatch = useDispatch();

  const handleSubmit = ({ selectedItem, quantity }) => {
    if (selectedItem.name !== "") {
      dispatch(addItemSale(selectedItem.ID, itemQuantity));
      setOpen(!isVisible);
    }
  };

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleExited = () => {
    dispatch(hideModal());
  };

  const renderItemDetails = () => {
    const discountAmount = selectedItem.price * (selectedItem.discount / 100);
    const incentiveAmount =
      selectedItem.price * (selectedItem.incentiveRate / 100);
    const totalItemPrice =
      selectedItem.price * itemQuantity - discountAmount - incentiveAmount;

    const renderItemStatus = () => {
      if (selectedItem.discount > 0) {
        return <div className={classes.discounted}>Discounted</div>;
      }
      return <div>In Stock</div>;
    };

    if (Object.keys(selectedItem).length === 0 || itemQuantity === 0) {
      return null;
    }

    return (
      <div className={classes.itemDetailsWrapper}>
        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Item Name
          </Typography>
          <Typography variant="h6" className={classes.itemContent}>
            {selectedItem.name}
          </Typography>
        </div>
        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Item Stock
          </Typography>
          <Typography className={classes.itemContent}>
            {`${selectedItem.inStock}`}
            <span className={classes.itemReduce}>
              {selectedItem.salesCategory !== "Store Sales"
                ? ""
                : ` -${itemQuantity}`}
            </span>
          </Typography>
        </div>
        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Item Status
          </Typography>
          <Typography className={classes.itemContent}>
            {renderItemStatus()}
          </Typography>
        </div>
        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Item Discount
          </Typography>
          <Typography className={classes.itemContent}>{`${
            selectedItem.discount
          }% (${Number(discountAmount).toFixed(2)})`}</Typography>
        </div>
        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Item Incentive
          </Typography>
          <Typography className={classes.itemContent}>{`${
            selectedItem.incentiveRate
          }% (${Number(incentiveAmount).toFixed(2)})`}</Typography>
        </div>

        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Item Price
          </Typography>
          <Typography className={classes.itemContent}>{`P${Number(
            selectedItem.price
          ).toFixed(2)}`}</Typography>
        </div>
        <div></div>
        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Total Item Price
          </Typography>
          <Typography className={classes.itemContent}>{`P${Number(
            totalItemPrice
          ).toFixed(2)}`}</Typography>
        </div>
        <div></div>
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullScreen
      TransitionComponent={Fade}
      TransitionProps={{
        onExited: handleExited,
      }}
    >
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <AddSalesForm
          onSubmit={handleSubmit}
          classes={classes}
          dispatch={dispatch}
          items={result}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setItemQuantity={setItemQuantity}
          itemQuantity={itemQuantity}
          isLoading={isLoading}
          error={error}
        />
        {renderItemDetails()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Cancel</Button>
        <Button form="form" type="submit">
          Add Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddSalesForm = ({
  onSubmit,
  classes,
  dispatch,
  items,
  isLoading,
  error,
  itemQuantity,
  selectedItem,
  setItemQuantity,
  setSelectedItem,
}) => {
  const options = items.map((item) => {
    return {
      id: item.ID,
      label: item.name,
    };
  });
  const defaultValues = {
    selectedItem: {
      description: "",
      discount: 0,
      inStock: "",
      incentive: 0,
      name: "",
      price: 0,
      remarks: "",
      salesCategory: "",
    },
  };

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      selectedItem: {
        description: "",
        discount: 0,
        inStock: "",
        incentive: 0,
        name: "",
        price: 0,
        remarks: "",
        salesCategory: "",
      },
      quantity: 1,
    },
  });

  const search = (searchTerm) => {
    if (searchTerm === "") {
      dispatch(clearItemsSearch());
    } else {
      dispatch(searchItems(searchTerm));
    }
  };

  const debouncedSearch = debounce(search, 800);

  const handleOnChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <form className={classes.form} id="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ onChange, ...props }) => (
          <Autocomplete
            loading={isLoading}
            options={items.filter((item) => item.inStock > 0)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                label="Item Name"
                variant="outlined"
                onChange={handleOnChange}
                error={!!errors.selectedItem}
                helperText={!!errors.selectedItem ? "Enter Item Name" : ""}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress color="secondary" />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            onChange={(e, data, reason) => {
              if (reason === "select-option") {
                setSelectedItem(data);
                onChange(data);
              }
            }}
            {...props}
          />
        )}
        defaultValue={defaultValues.selectedItem}
        onChange={([, data]) => {
          console.log(data);
          return data;
        }}
        name="selectedItem"
        control={control}
        rules={{
          required: true,
        }}
      />
      {Object.keys(selectedItem).length === 0 ? null : (
        <TextField
          disabled={selectedItem.salesCategory !== "Store Sales"}
          hidden={Object.keys(selectedItem).length === 0}
          variant="outlined"
          label="Quantity"
          inputRef={register({
            required: true,
            min: 1,
            validate: (quantity) =>
              quantity <= Number(selectedItem.inStock) && quantity > 0,
          })}
          error={!!errors.quantity}
          helperText={!!errors.quantity ? "Invalid Input" : ""}
          name="quantity"
          fullWidth
          size="small"
          value={itemQuantity}
          onChange={(e) => {
            setItemQuantity(e.target.value);
          }}
        />
      )}
    </form>
  );
};
