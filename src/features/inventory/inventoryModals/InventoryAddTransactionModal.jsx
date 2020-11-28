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
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../modals/modalSlice";
import { useForm, Controller } from "react-hook-form";
import { addItem, fetchItems, fetchItemsWithSearch } from "../inventorySlice";
import { debounce } from "../../../utils/debounce";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => {
  return {
    form: {
      display: "grid",
      width: "100%",
      gridTemplate: "1fr / 1fr 0.05fr",
      gridGap: "1em",
    },
    itemDetailsWrapper: {
      display: "flex",
      width: "100%",
      flexWrap: "wrap",
      placeContent: "center",
      gridGap: "1em",
      padding: "1em 5em",
    },
    itemDetail: {
      border: "2px solid green",
      borderRadius: "5px",
      borderColor: theme.palette.secondary.main,
      padding: "1em",
    },
    itemLabel: {
      textAlign: "center",
      borderBottom: "1px solid green",
      borderColor: theme.palette.secondary.main,
      margin: "0 2em",
      padding: "0 1em",
    },
    itemContent: {
      textAlign: "center",
      padding: "0.5em",
    },
    discounted: {
      color: `${blue[400]} !important`,
    },
    addTransactionFormField: {
      margin: "0.5em",
    },
  };
});

export const InventoryAddTransactionModal = ({ isVisible }) => {
  const [open, setOpen] = useState(isVisible);
  const [fieldOpen, setFieldOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [itemQuantity, setItemQuantity] = useState(0);
  const { items, isLoading, error } = useSelector((state) => state.inventory);
  const classes = useStyles(selectedItem);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    console.log(data);
  };

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };
  const renderItemDetails = () => {
    const discountAmount = selectedItem.price * (selectedItem.discount / 100);
    const incentiveAmount = selectedItem.price * (selectedItem.incentive / 100);
    const totalItemPrice =
      selectedItem.price * itemQuantity - discountAmount - incentiveAmount;

    const renderItemStatus = () => {
      if (selectedItem.discount > 0) {
        return <div className={classes.discounted}>Discounted</div>;
      }
      return <div>In Stock</div>;
    };

    if (Object.keys(selectedItem).length === 0 && itemQuantity === 0) {
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
            {selectedItem.inStock}
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
            selectedItem.incentive
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
        <div className={classes.itemDetail}>
          <Typography variant="h6" className={classes.itemLabel}>
            Total Item Price
          </Typography>
          <Typography className={classes.itemContent}>{`P${Number(
            totalItemPrice
          ).toFixed(2)}`}</Typography>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      onExited={handleOnExited}
      fullScreen
    >
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent>
        <AddSalesForm
          onSubmit={handleSubmit}
          classes={classes}
          dispatch={dispatch}
          items={items}
          fieldOpen={fieldOpen}
          setFieldOpen={setFieldOpen}
          setSelectedItem={setSelectedItem}
          setItemQuantity={setItemQuantity}
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
  fieldOpen,
  setFieldOpen,
  setItemQuantity,
  setSelectedItem,
}) => {
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

  const { register, handleSubmit, errors, control, getValues, watch } = useForm(
    {
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
      },
    }
  );

  const handleOnChange = ({ target: { value } }) => {
    if (value !== "" && value.length >= 3) {
      debounce(800, dispatch(fetchItemsWithSearch(value)));
    }
  };

  return (
    <form className={classes.form} id="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ onChange, ...props }) => (
          <Autocomplete
            loading={isLoading}
            options={items.filter((item) => item.inStock > 0)}
            getOptionLabel={(option) => String(option.name)}
            getOptionSelected={(option) => option.name}
            renderOption={(option) => (
              <Typography>{String(option.name)}</Typography>
            )}
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
      <TextField
        variant="outlined"
        label="Quantity"
        inputRef={register({
          required: true,
          min: 0,
        })}
        error={!!errors.quantity}
        helperText={!!errors.quantity ? "Enter Item Quanity" : ""}
        name="quantity"
        type="number"
        fullWidth
        size="small"
        onChange={(e) => {
          setItemQuantity(e.target.value);
        }}
      />
    </form>
  );
};
