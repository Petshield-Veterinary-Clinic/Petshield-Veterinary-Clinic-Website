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
import { discountItem } from "../inventoryItems/inventoryItemsSlice";

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

export const InventoryDiscountItemModal = ({ isVisible, item, itemIndex }) => {
  const [open, setOpen] = useState(isVisible);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = ({ discount }) => {
    setOpen(!isVisible);
    dispatch(discountItem({ ...item, discount }, itemIndex));
  };

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };
  return (
    <Dialog open={open} onClose={handleOnClose} onExited={handleOnExited}>
      <DialogTitle>Discount Item</DialogTitle>
      <DialogContent>
        <DiscountItemForm
          onSubmit={handleSubmit}
          classes={classes}
          itemDetails={item}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Cancel</Button>
        <Button form="discountItemForm" type="submit">
          Discount Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DiscountItemForm = ({ onSubmit, classes, itemDetails }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      discount: itemDetails.discount !== null ? itemDetails.discount : 0.0,
    },
  });
  return (
    <form
      noValidate
      className={classes.addItemForm}
      id="discountItemForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        className={classes.addItemFormField}
        variant="outlined"
        label="Discount Amount"
        name="discount"
        size="small"
        type="number"
        helperText={
          !!errors.discount ? "Please input a value between 0.01 and 100" : ""
        }
        InputProps={{
          endAdornment: (
            <Typography>
              <strong>%</strong>
            </Typography>
          ),
        }}
        inputRef={register({
          required: true,
          min: 0.0,
          max: 100.0,
        })}
        autoFocus
        error={!!errors.discount}
      />
    </form>
  );
};
