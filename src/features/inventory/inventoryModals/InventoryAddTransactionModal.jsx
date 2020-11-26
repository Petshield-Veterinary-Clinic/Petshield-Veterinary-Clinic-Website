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
import { addItem } from "../inventorySlice";

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

export const InventoryAddItemModal = ({ isVisible }) => {
  const [open, setOpen] = useState(isVisible);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    dispatch(addItem(data));
    setOpen(!isVisible);
  };

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  return (
    <Dialog open={open} onClose={handleOnClose} onExited={handleOnExited}>
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <AddTransactionForm onSubmit={handleSubmit} classes={classes} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Cancel</Button>
        <Button form="addItemForm" type="submit">
          Add Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddTransactionForm = ({ onSubmit, classes }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      remarks: "",
      salesCategory: "",
    },
  });
  return (
    <form
      noValidate
      className={classes.addItemForm}
      id="addItemForm"
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
