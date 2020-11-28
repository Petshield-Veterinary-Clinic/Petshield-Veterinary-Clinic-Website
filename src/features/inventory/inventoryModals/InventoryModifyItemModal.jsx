import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../modals/modalSlice";
import { useForm } from "react-hook-form";
import { modifyItem } from "../inventoryItems/inventoryItemsSlice";

const useStyles = makeStyles((_) => {
  return {
    addItemForm: {
      display: "flex",
      width: "100%",
      height: "100%",
      flexDirection: "column",
    },
    addItemFormField: {
      margin: "0.5em",
    },
  };
});

export const InventoryModifyItemModal = ({ isVisible, item, itemIndex }) => {
  const [open, setOpen] = useState(isVisible);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    // console.log({ ...item, ...data });
    dispatch(modifyItem({ ...item, ...data }, itemIndex));
    setOpen(!isVisible);
  };

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      onExited={handleOnExited}
      fullWidth
    >
      <DialogTitle>Modify Item</DialogTitle>
      <DialogContent>
        <ModifyItemForm
          onSubmit={handleSubmit}
          classes={classes}
          itemDetails={item}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Cancel</Button>
        <Button form="modifyItemForm" type="submit">
          Modify Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ModifyItemForm = ({ onSubmit, classes, itemDetails }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      remarks: itemDetails.remarks !== null ? itemDetails.remarks : "",
      salesCategory:
        itemDetails.salesCategory !== null ? itemDetails.salesCategory : "",
      price: itemDetails.price !== null ? itemDetails.price : 0,
      name: itemDetails.name !== null ? itemDetails.name : "",
      incentive: itemDetails.incentive !== null ? itemDetails.incentive : 0,
      inStock: itemDetails.inStock !== null ? itemDetails.inStock : 0,
    },
  });
  return (
    <form
      noValidate
      className={classes.addItemForm}
      id="modifyItemForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        className={classes.addItemFormField}
        variant="outlined"
        label="Item Name"
        name="name"
        size="small"
        inputRef={register({
          required: true,
        })}
        error={!!errors.name}
      />
      <TextField
        className={classes.addItemFormField}
        variant="outlined"
        label="Item Stock"
        name="inStock"
        size="small"
        inputRef={register({
          required: true,
          min: 0,
        })}
        error={!!errors.inStock}
      />
      <TextField
        className={classes.addItemFormField}
        variant="outlined"
        label="Item Price"
        name="price"
        size="small"
        InputProps={{
          startAdornment: <Typography>₱</Typography>,
        }}
        inputRef={register({
          required: true,
          min: 0.0,
        })}
        error={!!errors.price}
      />
      <TextField
        className={classes.addItemFormField}
        variant="outlined"
        label="Item Sales Category"
        name="salesCategory"
        size="small"
        inputRef={register}
      />
      <TextField
        className={classes.addItemFormField}
        variant="outlined"
        label="Incentive Rate"
        name="incentive"
        size="small"
        InputProps={{
          endAdornment: <Typography>%</Typography>,
        }}
        inputRef={register({
          required: true,
          max: 100.0,
          min: 0.0,
        })}
        error={!!errors.incentive}
      />
      <TextField
        className={classes.addItemFormField}
        variant="outlined"
        label="Remarks"
        name="remarks"
        size="small"
        inputRef={register}
      />
    </form>
  );
};
