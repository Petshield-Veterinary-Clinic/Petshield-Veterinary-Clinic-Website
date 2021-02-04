import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../modals/modalSlice";
import { useForm, Controller } from "react-hook-form";
import { addItem } from "../inventoryItems/inventoryItemsSlice";
import { fetchItemCategories } from "../../itemCategory/itemCategorySlice";

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

export const InventoryAddItemModal = ({ isVisible }) => {
  const [open, setOpen] = useState(isVisible);
  const [isIncentiveFixed, setIncentiveFixed] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    const newItem = { ...data };
    newItem.isIncentiveFixed = isIncentiveFixed;
    if (isIncentiveFixed) {
      newItem.incentiveRate = 0;
    } else {
      newItem.incentiveAmount = 0;
    }

    dispatch(addItem(newItem));
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
    >
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <AddItemForm
          onSubmit={handleSubmit}
          dispatch={dispatch}
          classes={classes}
          isIncentiveFixed={isIncentiveFixed}
          setIncentiveFixed={setIncentiveFixed}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Cancel</Button>
        <Button form="addItemForm" type="submit">
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddItemForm = ({
  onSubmit,
  classes,
  isIncentiveFixed,
  setIncentiveFixed,
  dispatch,
}) => {
  const { isLoading, categories } = useSelector(
    (state) => state.itemCategories
  );

  const onCategoriesFocused = () => {
    dispatch(fetchItemCategories());
  };
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      remarks: "",
      category: "Store Sales",
      incentiveRate: 0,
      incentiveAmount: 0,
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
      <Controller
        control={control}
        name="category"
        as={
          <Select
            className={classes.addItemFormField}
            variant="outlined"
            size="small"
            onFocus={onCategoriesFocused}
            endAdornment={
              isLoading ? (
                <InputAdornment>
                  <CircularProgress />
                </InputAdornment>
              ) : null
            }
          >
            <MenuItem value=""></MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.ID} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        }
      />

      <div>
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
