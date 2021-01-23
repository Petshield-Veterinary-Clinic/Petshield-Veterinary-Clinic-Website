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
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../modals/modalSlice";
import { useForm, Controller } from "react-hook-form";
import { modifyItem } from "../inventoryItems/inventoryItemsSlice";
import { itemCategories } from "../../../consts";

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
      flexGrow: "1",
    },
    incentiveFieldsWrapper: {
      display: "flex",
    },
  };
});

export const InventoryModifyItemModal = ({ isVisible, item, itemIndex }) => {
  const [open, setOpen] = useState(isVisible);
  const [isIncentiveFixed, setIncentiveFixed] = useState(item.isIncentiveFixed);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    const updatedItem = { ...item, ...data };
    updatedItem.isIncentiveFixed = isIncentiveFixed;
    if (isIncentiveFixed) {
      updatedItem.incentiveRate = 0;
    } else {
      updatedItem.incentiveAmount = 0;
    }

    dispatch(modifyItem(updatedItem, itemIndex));
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
      TransitionProps={{ onExited: handleOnExited }}
      fullWidth
    >
      <DialogTitle>Modify Item</DialogTitle>
      <DialogContent>
        <ModifyItemForm
          onSubmit={handleSubmit}
          classes={classes}
          itemDetails={item}
          isIncentiveFixed={isIncentiveFixed}
          setIncentiveFixed={setIncentiveFixed}
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

const ModifyItemForm = ({
  onSubmit,
  classes,
  itemDetails,
  isIncentiveFixed,
  setIncentiveFixed,
}) => {
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      remarks: itemDetails.remarks !== null ? itemDetails.remarks : "",
      category: itemDetails.category !== null ? itemDetails.category : "",
      price: itemDetails.price !== null ? itemDetails.price : 0,
      name: itemDetails.name !== null ? itemDetails.name : "",
      incentiveRate:
        itemDetails.incentiveRate !== null ? itemDetails.incentiveRate : 0,
      incentiveAmount:
        itemDetails.incentiveAmount !== null ? itemDetails.incentiveAmount : 0,
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
      <Controller
        control={control}
        name="category"
        as={
          <Select
            className={classes.addItemFormField}
            variant="outlined"
            size="small"
          >
            {itemCategories.map((itemCategory) => (
              <MenuItem key={itemCategory} value={itemCategory}>
                {itemCategory}
              </MenuItem>
            ))}
          </Select>
        }
      />
      <FormControlLabel
        className={classes.addItemFormField}
        control={
          <Checkbox
            checked={isIncentiveFixed}
            onChange={() => {
              setIncentiveFixed(!isIncentiveFixed);
            }}
          />
        }
        label="Fixed Incentive Rate"
      />
      <div className={classes.incentiveFieldsWrapper}>
        <TextField
          disabled={isIncentiveFixed}
          className={classes.addItemFormField}
          variant="outlined"
          label="Incentive Rate"
          name="incentiveRate"
          size="small"
          InputProps={{
            endAdornment: <Typography>%</Typography>,
          }}
          inputRef={register({
            required: true,
            max: 100.0,
            min: 0.0,
          })}
          error={!!errors.incentiveRate}
        />
        <TextField
          disabled={!isIncentiveFixed}
          className={classes.addItemFormField}
          variant="outlined"
          label="Incentive Amount"
          name="incentiveAmount"
          size="small"
          inputRef={register({
            required: true,
            min: 0.0,
          })}
          error={!!errors.incentiveAmount}
        />
      </div>
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
